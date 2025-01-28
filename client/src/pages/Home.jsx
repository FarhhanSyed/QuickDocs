function Home() {
  const documents = ["Document 1", "Document 2", "Document 3"]; // Example document list

  return (
    <div className="flex flex-col min-h-screen">
      <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
        <h1 className="text-xl">Quick Docs</h1>
        <div className="cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 0 24 24"
            width="24"
            fill="white"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
        </div>
      </div>
      <ul className="flex-grow list-none p-0">
        {documents.map((doc, index) => (
          <li key={index} className="p-4 border-b border-gray-300">
            {doc}
          </li>
        ))}
      </ul>
      <div className="bg-blue-600 text-white p-4 flex justify-around fixed bottom-0 w-full">
        <div className="cursor-pointer flex flex-col items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 0 24 24"
            width="24"
            fill="white"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
          </svg>
          <p className="m-0">Upload</p>
        </div>
        <div className="cursor-pointer flex flex-col items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 0 24 24"
            width="24"
            fill="white"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M15 9H9v6h6V9zm4-6H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z" />
          </svg>
          <p className="m-0">Share</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
