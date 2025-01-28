const Document = ({ doc }) => {
  return (
    <div className="document p-4 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-2">{doc.name}</h2>
      <p className="mb-1">
        <strong>User ID:</strong> {doc.user}
      </p>
      <p className="mb-1">
        <strong>File Path:</strong> {doc.path}
      </p>
      <p className="mb-4">
        <strong>Created At:</strong> {new Date(doc.createdAt).toLocaleString()}
      </p>
      <div>
        <h3 className="text-xl font-semibold mb-2">Metadata</h3>
        <ul className="list-disc list-inside">
          {Object.entries(doc.metadata).map(([key, value]) => (
            <li key={key}>
              <strong>{key}:</strong> {value}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Document;
