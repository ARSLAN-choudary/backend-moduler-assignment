const apiKeyAuth = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  const VALID_KEY = process.env.MY_SECRET_KEY || 'arslan123'; 

  if (!apiKey || apiKey !== VALID_KEY) {
    return res.status(401).json({ error: 'Unauthorized: Invalid API Key' });
  }
  next();
};

module.exports = apiKeyAuth;