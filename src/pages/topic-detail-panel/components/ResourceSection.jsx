import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const ResourceSection = ({ 
  topic,
  className = ""
}) => {
  const [activeTab, setActiveTab] = useState('videos');
  const [expandedResource, setExpandedResource] = useState(null);

  // Mock resources data
  const resources = {
    videos: [
      {
        id: 1,
        title: `${topic?.name} - Complete Tutorial`,
        thumbnail: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=300&h=200&fit=crop",
        duration: "15:32",
        channel: "TechEdu",
        rating: 4.8,
        views: "125K",
        url: "#"
      },
      {
        id: 2,
        title: `Understanding ${topic?.name} Concepts`,
        thumbnail: "https://images.pexels.com/photos/5428836/pexels-photo-5428836.jpeg?w=300&h=200&fit=crop",
        duration: "22:45",
        channel: "CodeMaster",
        rating: 4.6,
        views: "89K",
        url: "#"
      },
      {
        id: 3,
        title: `${topic?.name} Practical Examples`,
        thumbnail: "https://images.pixabay.com/photo/2016/11/19/14/00/code-1839406_960_720.jpg?w=300&h=200&fit=crop",
        duration: "18:20",
        channel: "LearnFast",
        rating: 4.9,
        views: "203K",
        url: "#"
      }
    ],
    articles: [
      {
        id: 1,
        title: `Complete Guide to ${topic?.name}`,
        source: "GeeksforGeeks",
        readTime: "8 min read",
        rating: 4.7,
        excerpt: `Comprehensive guide covering all aspects of ${topic?.name} with practical examples and best practices.`,
        url: "#"
      },
      {
        id: 2,
        title: `${topic?.name} Best Practices`,
        source: "W3Schools",
        readTime: "5 min read",
        rating: 4.5,
        excerpt: `Learn the industry-standard best practices and common patterns for implementing ${topic?.name}.`,
        url: "#"
      },
      {
        id: 3,
        title: `Advanced ${topic?.name} Techniques`,
        source: "MDN Web Docs",
        readTime: "12 min read",
        rating: 4.8,
        excerpt: `Deep dive into advanced techniques and optimization strategies for ${topic?.name}.`,
        url: "#"
      }
    ],
    books: [
      {
        id: 1,
        title: `Mastering ${topic?.name}`,
        author: "John Smith",
        pages: 320,
        rating: 4.6,
        cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=200&h=300&fit=crop",
        description: `A comprehensive book covering ${topic?.name} from basics to advanced concepts.`
      },
      {
        id: 2,
        title: `${topic?.name} in Practice`,
        author: "Sarah Johnson",
        pages: 280,
        rating: 4.4,
        cover: "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?w=200&h=300&fit=crop",
        description: `Practical approach to learning ${topic?.name} with real-world examples.`
      }
    ]
  };

  const tabs = [
    { id: 'videos', label: 'Videos', icon: 'Play', count: resources?.videos?.length },
    { id: 'articles', label: 'Articles', icon: 'FileText', count: resources?.articles?.length },
    { id: 'books', label: 'Books', icon: 'Book', count: resources?.books?.length }
  ];

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars?.push(<Icon key={i} name="Star" size={12} className="text-yellow-400 fill-current" />);
    }
    
    if (hasHalfStar) {
      stars?.push(<Icon key="half" name="Star" size={12} className="text-yellow-400" />);
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars?.push(<Icon key={`empty-${i}`} name="Star" size={12} className="text-gray-300" />);
    }
    
    return stars;
  };

  const VideoCard = ({ video }) => (
    <div className="bg-muted/30 rounded-lg p-4 hover:bg-muted/50 transition-colors duration-200">
      <div className="flex space-x-3">
        <div className="relative flex-shrink-0">
          <Image
            src={video?.thumbnail}
            alt={video?.title}
            className="w-20 h-14 rounded object-cover"
          />
          <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 rounded">
            {video?.duration}
          </div>
        </div>
        
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-foreground text-sm mb-1 line-clamp-2">
            {video?.title}
          </h4>
          <p className="text-xs text-muted-foreground mb-2">{video?.channel}</p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                {renderStars(video?.rating)}
                <span className="text-xs text-muted-foreground ml-1">
                  {video?.rating}
                </span>
              </div>
              <span className="text-xs text-muted-foreground">
                {video?.views} views
              </span>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              iconName="ExternalLink"
              iconSize={14}
              className="h-6 px-2"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const ArticleCard = ({ article }) => (
    <div className="bg-muted/30 rounded-lg p-4 hover:bg-muted/50 transition-colors duration-200">
      <div className="flex items-start justify-between mb-2">
        <h4 className="font-medium text-foreground text-sm line-clamp-2 flex-1">
          {article?.title}
        </h4>
        <Button
          variant="ghost"
          size="sm"
          iconName="ExternalLink"
          iconSize={14}
          className="h-6 px-2 ml-2 flex-shrink-0"
        />
      </div>
      
      <div className="flex items-center space-x-2 mb-2 text-xs text-muted-foreground">
        <span>{article?.source}</span>
        <span>•</span>
        <span>{article?.readTime}</span>
        <span>•</span>
        <div className="flex items-center">
          {renderStars(article?.rating)}
          <span className="ml-1">{article?.rating}</span>
        </div>
      </div>
      
      <p className="text-xs text-muted-foreground line-clamp-2">
        {article?.excerpt}
      </p>
    </div>
  );

  const BookCard = ({ book }) => (
    <div className="bg-muted/30 rounded-lg p-4 hover:bg-muted/50 transition-colors duration-200">
      <div className="flex space-x-3">
        <Image
          src={book?.cover}
          alt={book?.title}
          className="w-12 h-16 rounded object-cover flex-shrink-0"
        />
        
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-foreground text-sm mb-1 line-clamp-1">
            {book?.title}
          </h4>
          <p className="text-xs text-muted-foreground mb-1">by {book?.author}</p>
          
          <div className="flex items-center space-x-2 mb-2 text-xs text-muted-foreground">
            <span>{book?.pages} pages</span>
            <span>•</span>
            <div className="flex items-center">
              {renderStars(book?.rating)}
              <span className="ml-1">{book?.rating}</span>
            </div>
          </div>
          
          <p className="text-xs text-muted-foreground line-clamp-2">
            {book?.description}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`bg-card p-4 lg:p-6 ${className}`}>
      <h3 className="text-lg font-heading font-semibold text-foreground mb-4 flex items-center">
        <Icon name="Library" size={20} className="mr-2 text-primary" />
        Learning Resources
      </h3>
      {/* Resource Tabs */}
      <div className="flex space-x-1 mb-4 bg-muted/50 rounded-lg p-1">
        {tabs?.map((tab) => (
          <button
            key={tab?.id}
            onClick={() => setActiveTab(tab?.id)}
            className={`flex-1 flex items-center justify-center space-x-2 py-2 px-3 rounded-md text-sm font-medium transition-all duration-200 ${
              activeTab === tab?.id
                ? 'bg-card text-primary shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon name={tab?.icon} size={16} />
            <span className="hidden sm:inline">{tab?.label}</span>
            <span className="bg-primary/20 text-primary text-xs px-1.5 py-0.5 rounded-full">
              {tab?.count}
            </span>
          </button>
        ))}
      </div>
      {/* Resource Content */}
      <div className="space-y-3">
        {activeTab === 'videos' && resources?.videos?.map((video) => (
          <VideoCard key={video?.id} video={video} />
        ))}
        
        {activeTab === 'articles' && resources?.articles?.map((article) => (
          <ArticleCard key={article?.id} article={article} />
        ))}
        
        {activeTab === 'books' && resources?.books?.map((book) => (
          <BookCard key={book?.id} book={book} />
        ))}
      </div>
      {/* Load More Button */}
      <div className="mt-6 text-center">
        <Button
          variant="outline"
          size="sm"
          iconName="Plus"
          iconSize={16}
        >
          Load More Resources
        </Button>
      </div>
    </div>
  );
};

export default ResourceSection;