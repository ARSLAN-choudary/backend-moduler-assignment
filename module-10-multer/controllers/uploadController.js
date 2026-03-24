let sseClients = [];

exports.setupSSE = (req, res) => {
  res.set({
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
  });
  res.flushHeaders();

  const clientId = Date.now();
  const newClient = { id: clientId, res };
  sseClients.push(newClient);

  req.on('close', () => {
    sseClients = sseClients.filter(client => client.id !== clientId);
  });
};

const notifyClients = (data) => {
  sseClients.forEach(client => 
    client.res.write(`data: ${JSON.stringify(data)}\n\n`)
  );
};

exports.handleSingleUpload = (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

  const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
  notifyClients({ message: 'New single file uploaded', fileName: req.file.filename });

  res.status(200).json({ message: 'Success', url: fileUrl });
};

exports.handleGalleryUpload = (req, res) => {
  if (!req.files || req.files.length === 0) return res.status(400).json({ error: 'No files uploaded' });

  const urls = req.files.map(file => `${req.protocol}://${req.get('host')}/uploads/${file.filename}`);
  notifyClients({ message: `${req.files.length} files added to gallery` });

  res.status(200).json({ message: 'Gallery Uploaded', urls });
};