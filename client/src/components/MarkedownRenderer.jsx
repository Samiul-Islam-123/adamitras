import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const MarkdownRenderer = ({ markdown, className = '' }) => {
    return (
        <ReactMarkdown 
            remarkPlugins={[remarkGfm]}
            className={`prose prose-sm dark:prose-invert max-w-none ${className}`}
            components={{
                h1: ({node, ...props}) => <h2 className="text-2xl font-bold mb-3" {...props} />,
                h2: ({node, ...props}) => <h3 className="text-xl font-semibold mb-2" {...props} />,
                h3: ({node, ...props}) => <h4 className="text-lg font-medium mb-2" {...props} />,
                a: ({node, ...props}) => (
                    <a 
                        className="text-purple-600 hover:underline" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        {...props} 
                    />
                ),
                code: ({node, inline, className, children, ...props}) => {
                    return !inline ? (
                        <code 
                            className={`${className} bg-gray-100 p-2 rounded-md text-sm block overflow-x-auto`} 
                            {...props}
                        >
                            {children}
                        </code>
                    ) : (
                        <code 
                            className="bg-gray-100 px-1 rounded text-sm" 
                            {...props}
                        >
                            {children}
                        </code>
                    );
                },
                table: ({node, ...props}) => (
                    <div className="overflow-x-auto">
                        <table 
                            className="w-full border-collapse border border-gray-200 my-4" 
                            {...props} 
                        />
                    </div>
                ),
                th: ({node, ...props}) => (
                    <th 
                        className="border border-gray-200 px-4 py-2 bg-gray-100 font-semibold text-left" 
                        {...props} 
                    />
                ),
                td: ({node, ...props}) => (
                    <td 
                        className="border border-gray-200 px-4 py-2" 
                        {...props} 
                    />
                ),
                ul: ({node, ...props}) => (
                    <ul 
                        className="list-disc list-outside pl-6 mb-4" 
                        {...props} 
                    />
                ),
                ol: ({node, ...props}) => (
                    <ol 
                        className="list-decimal list-outside pl-6 mb-4" 
                        {...props} 
                    />
                ),
                blockquote: ({node, ...props}) => (
                    <blockquote 
                        className="border-l-4 border-purple-500 pl-4 py-2 italic text-gray-600 my-4" 
                        {...props} 
                    />
                )
            }}
        >
            {markdown}
        </ReactMarkdown>
    );
};

export default MarkdownRenderer;