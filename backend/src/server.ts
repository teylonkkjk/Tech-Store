import express, { Request, Response } from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  image: string;
  description: string;
}

interface OrderItem {
  productId: number;
  name: string;
  price: number;
  quantity: number;
}

interface Order {
  id: number;
  customerName: string;
  customerEmail: string;
  items: OrderItem[];
  total: number;
  createdAt: string;
}

interface ContactMessage {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

interface DatabaseSchema {
  products: Product[];
  orders: Order[];
  contacts: ContactMessage[];
}

const DATA_DIR = path.join(__dirname, '..', 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

const initialData: DatabaseSchema = {
  products: [
    {
      id: 1,
      name: 'Notebook Gamer Storm i7 16GB RTX 4060',
      category: 'Notebooks',
      price: 6499.90,
      stock: 8,
      image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=600&q=80',
      description: 'Processador Intel Core i7 de 13ª geração, 16GB RAM DDR5, SSD NVMe 1TB e tela 165Hz.'
    },
    {
      id: 2,
      name: 'Teclado Mecânico RGB Switch Red Wireless',
      category: 'Periféricos',
      price: 389.90,
      stock: 15,
      image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=600&q=80',
      description: 'Layout compacto 75%, conexão tri-mode (Bluetooth, 2.4GHz e USB-C) e keycaps PBT.'
    },
    {
      id: 3,
      name: 'Monitor Ultrawide 29" IPS 100Hz FHD',
      category: 'Monitores',
      price: 1199.00,
      stock: 6,
      image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=600&q=80',
      description: 'Proporção 21:9 ideal para produtividade e programação, sRGB 99% e HDR10.'
    },
    {
      id: 4,
      name: 'Mouse Gamer Ultraleve 26000 DPI Sem Fio',
      category: 'Periféricos',
      price: 299.90,
      stock: 20,
      image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=600&q=80',
      description: 'Sensor óptico de alta precisão, apenas 58g e bateria com duração de até 70 horas.'
    },
    {
      id: 5,
      name: 'Headset Studio Surround 7.1 Cancelamento de Ruído',
      category: 'Áudio',
      price: 459.00,
      stock: 12,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
      description: 'Drivers de 50mm em neodímio, microfone destacável e almofadas em espuma viscoelástica.'
    },
    {
      id: 6,
      name: 'SSD NVMe M.2 PCIe 4.0 2TB 7000MB/s',
      category: 'Hardware',
      price: 899.90,
      stock: 10,
      image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=600&q=80',
      description: 'Leitura ultrarrápida de 7000MB/s com dissipador de calor em alumínio integrado.'
    }
  ],
  orders: [],
  contacts: []
};

function readDB(): DatabaseSchema {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2), 'utf-8');
    return initialData;
  }
  const raw = fs.readFileSync(DB_FILE, 'utf-8');
  return JSON.parse(raw) as DatabaseSchema;
}

function writeDB(data: DatabaseSchema): void {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

app.get('/api/products', (_req: Request, res: Response) => {
  const db = readDB();
  res.json(db.products);
});

app.post('/api/products', (req: Request, res: Response) => {
  const { name, category, price, stock, image, description } = req.body;
  if (!name || !category || price === undefined || stock === undefined) {
    res.status(400).json({ error: 'Preencha todos os campos obrigatórios.' });
    return;
  }

  const db = readDB();
  const newProduct: Product = {
    id: Date.now(),
    name: String(name),
    category: String(category),
    price: Number(price),
    stock: Number(stock),
    image: image || 'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?auto=format&fit=crop&w=600&q=80',
    description: String(description || 'Produto cadastrado pelo painel administrativo.')
  };

  db.products.push(newProduct);
  writeDB(db);
  res.status(201).json(newProduct);
});

app.delete('/api/products/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const db = readDB();
  const exists = db.products.some((p) => p.id === id);

  if (!exists) {
    res.status(404).json({ error: 'Produto não encontrado.' });
    return;
  }

  db.products = db.products.filter((p) => p.id !== id);
  writeDB(db);
  res.json({ message: 'Produto removido com sucesso.' });
});

app.post('/api/auth/login', (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: 'Informe e-mail e senha.' });
    return;
  }

  if (email === 'admin@techstore.com' && password === '123456') {
    res.json({
      id: 1,
      name: 'Administrador TechStore',
      email,
      role: 'admin',
      token: 'jwt-simulated-admin-token'
    });
    return;
  }

  res.json({
    id: Date.now(),
    name: email.split('@')[0],
    email,
    role: 'customer',
    token: 'jwt-simulated-customer-token'
  });
});

app.get('/api/orders', (_req: Request, res: Response) => {
  const db = readDB();
  res.json(db.orders);
});

app.post('/api/orders', (req: Request, res: Response) => {
  const { customerName, customerEmail, items } = req.body;

  if (!customerName || !customerEmail || !Array.isArray(items) || items.length === 0) {
    res.status(400).json({ error: 'Dados do pedido inválidos.' });
    return;
  }

  const db = readDB();
  let calculatedTotal = 0;

  for (const item of items) {
    const product = db.products.find((p) => p.id === item.productId);
    if (!product) {
      res.status(404).json({ error: `Produto ID ${item.productId} não encontrado.` });
      return;
    }
    if (product.stock < item.quantity) {
      res.status(400).json({ error: `Estoque insuficiente para ${product.name}.` });
      return;
    }
    product.stock -= item.quantity;
    calculatedTotal += product.price * item.quantity;
  }

  const newOrder: Order = {
    id: Date.now(),
    customerName,
    customerEmail,
    items,
    total: Number(calculatedTotal.toFixed(2)),
    createdAt: new Date().toISOString()
  };

  db.orders.unshift(newOrder);
  writeDB(db);

  res.status(201).json({ order: newOrder, updatedProducts: db.products });
});

app.post('/api/contact', (req: Request, res: Response) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !message) {
    res.status(400).json({ error: 'Preencha nome, e-mail e mensagem.' });
    return;
  }

  const db = readDB();
  const newContact: ContactMessage = {
    id: Date.now(),
    name,
    email,
    subject: subject || 'Contato Geral',
    message,
    createdAt: new Date().toISOString()
  };

  db.contacts.push(newContact);
  writeDB(db);
  res.status(201).json({ message: 'Mensagem registrada com sucesso!', data: newContact });
});

app.listen(PORT, () => {
  console.log(`[TechStore API] Servidor rodando em http://localhost:${PORT}`);
});