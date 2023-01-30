import React from 'react'

type PageProps = {
    params: {
        searchTerm: string;
    };
};

type SearchResult = {
    organic_result: [
        {
            position: number;
            title: string;
            link: string;
            thumbnail: string;
            snippet: string;
        }
    ];
};

const search =async (searchTerm: string) => {
    const res = await fetch(
        `http://serpapi.com/search.json?q=${searchTerm}&api_key=${process.env.API_KEY}`
    );

    const data: SearchResult = await res.json();
    return data;
}

async function SearchResults({params: { searchTerm }}: PageProps) {
    const searchResults = await search(searchTerm)
    
    return (
        <div>
            <p className="text-gray-500 text-sm">You searched for: {searchTerm}</p>

            <ol className="space-y-5 p-5">
                {searchResults.organic_result?.map((result) => (
                    <li key={result.position} className="list-decimal">
                        <p className="font-bold">{result.title}</p>
                        <p>{result.snippet}</p>
                    </li>
                ))}
            </ol>
        </div>
    );
}

export default SearchResults;
