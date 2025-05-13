import express from 'express';
import cors from 'cors';
import { createClient } from '@supabase/supabase-js';

const app = express();
app.use(cors());
app.use(express.json());

const supabase = createClient(
  'https://nghjmcskdibzqpwkgdmk.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5naGptY3NrZGlienFwd2tnZG1rIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NjA4NzgyOCwiZXhwIjoyMDYxNjYzODI4fQ.IOM4Oas8-zYqNr01R-TL94NPGZ7TC-esnxdGKGc0OH0'
);

app.get('/api/admin-users', async (req, res) => {
  const { data, error } = await supabase.auth.admin.listUsers();
  if (error) {
    return res.status(500).json({ error: error.message });
  }
  res.json(data);
});

app.post('/api/admin-users', async (req, res) => {
  const { email, password, name, phone, role } = req.body;
  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    user_metadata: { name, phone, role },
    email_confirm: true
  });
  if (error) {
    return res.status(500).json({ error: error.message });
  }
  res.json(data);
});

app.put('/api/admin-users/:id', async (req, res) => {
  const { id } = req.params;
  const { email, name, phone, role } = req.body;
  const { data, error } = await supabase.auth.admin.updateUserById(id, {
    email,
    user_metadata: { name, phone, role }
  });
  if (error) {
    return res.status(500).json({ error: error.message });
  }
  res.json(data);
});

app.delete('/api/admin-users/:id', async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase.auth.admin.deleteUser(id);
  if (error) {
    return res.status(500).json({ error: error.message });
  }
  res.json({ success: true });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 