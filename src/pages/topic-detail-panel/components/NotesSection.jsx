import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';


const NotesSection = ({ 
  topic,
  className = ""
}) => {
  const [notes, setNotes] = useState('');
  const [savedNotes, setSavedNotes] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  // Load saved notes from localStorage on component mount
  useEffect(() => {
    const savedNotesData = localStorage.getItem(`notes_${topic?.id}`);
    if (savedNotesData) {
      setSavedNotes(JSON.parse(savedNotesData));
    }
  }, [topic?.id]);

  // Save notes to localStorage
  const saveNotesToStorage = (notesData) => {
    localStorage.setItem(`notes_${topic?.id}`, JSON.stringify(notesData));
  };

  const handleSaveNote = async () => {
    if (!notes?.trim()) return;

    setIsSaving(true);
    
    // Simulate saving delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const newNote = {
      id: Date.now(),
      content: notes?.trim(),
      timestamp: new Date()?.toISOString(),
      lastModified: new Date()?.toISOString()
    };

    const updatedNotes = [newNote, ...savedNotes];
    setSavedNotes(updatedNotes);
    saveNotesToStorage(updatedNotes);
    setNotes('');
    setIsEditing(false);
    setIsSaving(false);
  };

  const handleEditNote = (note) => {
    setNotes(note?.content);
    setEditingId(note?.id);
    setIsEditing(true);
  };

  const handleUpdateNote = async () => {
    if (!notes?.trim()) return;

    setIsSaving(true);
    
    // Simulate saving delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const updatedNotes = savedNotes?.map(note => 
      note?.id === editingId 
        ? { ...note, content: notes?.trim(), lastModified: new Date()?.toISOString() }
        : note
    );

    setSavedNotes(updatedNotes);
    saveNotesToStorage(updatedNotes);
    setNotes('');
    setEditingId(null);
    setIsEditing(false);
    setIsSaving(false);
  };

  const handleDeleteNote = (noteId) => {
    const updatedNotes = savedNotes?.filter(note => note?.id !== noteId);
    setSavedNotes(updatedNotes);
    saveNotesToStorage(updatedNotes);
  };

  const handleCancelEdit = () => {
    setNotes('');
    setEditingId(null);
    setIsEditing(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);

    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)} hours ago`;
    } else if (diffInHours < 48) {
      return 'Yesterday';
    } else {
      return date?.toLocaleDateString();
    }
  };

  return (
    <div className={`bg-card p-4 lg:p-6 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-heading font-semibold text-foreground flex items-center">
          <Icon name="StickyNote" size={20} className="mr-2 text-primary" />
          Personal Notes
        </h3>
        
        <div className="flex items-center space-x-2">
          <span className="text-xs text-muted-foreground">
            {savedNotes?.length} note{savedNotes?.length !== 1 ? 's' : ''}
          </span>
          {!isEditing && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsEditing(true)}
              iconName="Plus"
              iconSize={16}
            >
              <span className="hidden sm:inline ml-1">Add Note</span>
            </Button>
          )}
        </div>
      </div>
      {/* Note Editor */}
      {isEditing && (
        <div className="mb-6 p-4 bg-muted/30 rounded-lg border-2 border-dashed border-primary/30">
          <div className="mb-3">
            <textarea
              value={notes}
              onChange={(e) => setNotes(e?.target?.value)}
              placeholder={`Add your notes about ${topic?.name}...`}
              className="w-full h-32 p-3 bg-card border border-border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
              autoFocus
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="text-xs text-muted-foreground">
              {notes?.length}/1000 characters
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCancelEdit}
                disabled={isSaving}
              >
                Cancel
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={editingId ? handleUpdateNote : handleSaveNote}
                loading={isSaving}
                disabled={!notes?.trim() || isSaving}
                iconName="Save"
                iconSize={16}
              >
                {editingId ? 'Update' : 'Save'} Note
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* Saved Notes */}
      <div className="space-y-3">
        {savedNotes?.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="FileText" size={48} className="mx-auto text-muted-foreground/50 mb-3" />
            <p className="text-muted-foreground text-sm mb-2">No notes yet</p>
            <p className="text-muted-foreground text-xs">
              Add your first note to keep track of important points
            </p>
          </div>
        ) : (
          savedNotes?.map((note) => (
            <div
              key={note?.id}
              className="bg-muted/30 rounded-lg p-4 hover:bg-muted/50 transition-colors duration-200 group"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <p className="text-sm text-foreground whitespace-pre-wrap leading-relaxed">
                    {note?.content}
                  </p>
                </div>
                
                <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ml-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEditNote(note)}
                    iconName="Edit2"
                    iconSize={14}
                    className="h-6 px-2"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteNote(note?.id)}
                    iconName="Trash2"
                    iconSize={14}
                    className="h-6 px-2 text-error hover:text-error"
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{formatDate(note?.timestamp)}</span>
                {note?.lastModified !== note?.timestamp && (
                  <span>Edited {formatDate(note?.lastModified)}</span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
      {/* Quick Actions */}
      {savedNotes?.length > 0 && (
        <div className="mt-6 pt-4 border-t border-border">
          <div className="flex items-center justify-between">
            <div className="text-xs text-muted-foreground">
              Study notes for {topic?.name}
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                iconName="Download"
                iconSize={14}
              >
                <span className="hidden sm:inline ml-1">Export</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                iconName="Share2"
                iconSize={14}
              >
                <span className="hidden sm:inline ml-1">Share</span>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotesSection;