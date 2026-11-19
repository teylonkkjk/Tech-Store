# 🛒 TechStore — E-Commerce de Hardware & Periféricos

Aplicação web Full-Stack de e-commerce desenvolvida como Trabalho Final (AV2) para a disciplina de **Front-end Frameworks** do curso de **Ciência da Computação**[cite: 1, 2].

O sistema conta com uma interface moderna construída em **React.js com TypeScript** integrada a uma **API RESTful própria em Node.js + Express**[cite: 2, 7], oferecendo controle de estoque em tempo real[cite: 1, 5, 7], carrinho persistente[cite: 1, 5], filtragem dinâmica[cite: 4, 5] e painel administrativo com métricas financeiras[cite: 2, 7].

---

## 🚀 Tecnologias Utilizadas

### **Front-end**
* **React.js** (Vite)[cite: 1, 2, 7]
* **TypeScript** (Tipagem estática e Interfaces)[cite: 1, 2]
* **Tailwind CSS** (Estilização responsiva)[cite: 3]
* **React Router DOM** (Roteamento SPA com 5 páginas)[cite: 1, 2]
* **Context API + Custom Hooks** (`ShopContext` / `useShop`)[cite: 1, 3]

### **Back-end (API REST)**
* **Node.js** + **Express**[cite: 1, 2, 7]
* **TypeScript**[cite: 2, 7]
* **CORS**[cite: 7]
* **Persistência Documental Local** (`data/db.json`)[cite: 7]

---

## 🖥️ Páginas da Aplicação (Rotas)

A aplicação possui **5 páginas distintas** gerenciadas via `react-router-dom`[cite: 2]:

1. **`/` (`Home.tsx`)**: Vitrine inicial com banner principal, busca rápida em tempo real e produtos em destaque[cite: 2, 4].
2. **`/catalogo` (`Catalog.tsx`)**: Catálogo completo com combinação simultânea de busca por texto, filtro dinâmico por categorias e ordenação por preço ou ordem alfabética[cite: 2, 4].
3. **`/carrinho` (`Cart.tsx`)**: Gestão de itens adicionados, controle de quantidade limitado ao estoque real, cálculo automático de frete e checkout integrado à API[cite: 2, 5, 6].
4. **`/login` (`Login.tsx`)**: Autenticação de clientes e administradores integrada ao endpoint `/api/auth/login`[cite: 2, 6, 7].
5. **`/dashboard` (`Dashboard.tsx`)**: Painel administrativo com cartões de métricas (faturamento total, estoque e pedidos) e CRUD de produtos (cadastro via modal e exclusão)[cite: 2, 7].

---

## 🧩 Os 10 Componentes Funcionais

1. **`Navbar.tsx`**: Menu superior com destaque automático de rota ativa (`useLocation`), contador dinâmico do carrinho (`cartCount`) e controle de sessão (Login/Logout)[cite: 3].
2. **`Footer.tsx`**: Rodapé institucional responsivo em 3 colunas com links rápidos via `<Link>` e informações de pagamento e segurança[cite: 3].
3. **`SearchBar.tsx`**: Barra de pesquisa controlada com foco automático via `useRef` ao limpar o campo de busca[cite: 4].
4. **`AlertBanner.tsx`**: Sistema de notificações flutuantes dinâmicas (sucesso/erro) com fechamento automático após 4 segundos[cite: 4].
5. **`CategoryFilter.tsx`**: Barra de filtragem por categorias extraídas dinamicamente e seletor de critério de ordenação[cite: 5].
6. **`ProductCard.tsx`**: Card de exibição do produto com formatação de moeda (`BRL`), validação de disponibilidade (`stock > 0`) e selo dinâmico de estoque/esgotado[cite: 5].
7. **`CartItemRow.tsx`**: Linha de item no carrinho com cálculo de subtotal e trava de segurança (`disabled`) baseada no limite de estoque da API[cite: 6].
8. **`OrderSummary.tsx`**: Resumo financeiro do pedido com regra de negócio para frete grátis (compras acima de R$ 500,00; caso contrário, taxa fixa de R$ 39,90) e formulário de checkout[cite: 6].
9. **`StatCard.tsx`**: Componente reutilizável para exibição padronizada de indicadores e métricas financeiras/operacionais no Dashboard[cite: 7].
10. **`ProductFormModal.tsx`**: Modal controlado para cadastro de novos produtos com validação de campos e envio assíncrono para a API[cite: 7].

---

## ⚛️ Hooks e Recursos Aplicados

* **`useState`**: Controle de formulários, estados locais de modais, filtros e dados carregados da API[cite: 1, 3, 6, 7].
* **`useEffect`**: Busca inicial de produtos e pedidos (`fetchProducts` / `fetchOrders`) e sincronização automática do carrinho com o `localStorage`[cite: 3].
* **`useContext` & Custom Hook (`useShop`)**: Compartilhamento global de estado (produtos, carrinho, usuário logado, pedidos e notificações) evitando *prop drilling*[cite: 3].
* **`useCallback`**: Memorização de funções críticas do contexto (`addToCart`, `removeFromCart`, `checkoutOrder`) para evitar renderizações desnecessárias[cite: 3].
* **`useMemo`**: Otimização de performance na filtragem/ordenação do catálogo, extração única de categorias (`new Set()`), cálculo total do carrinho (`.reduce()`) e métricas de faturamento no Dashboard[cite: 4, 5, 6, 7].
* **`useRef`**: Manipulação direta do DOM no `SearchBar` para devolver o foco ao input imediatamente após limpar a pesquisa[cite: 1, 4].

---

## 🔌 Endpoints da API REST (`http://localhost:3001`)

| Método | Rota | Descrição |
| :--- | :--- | :--- |
| `GET` | `/api/products` | Lista todos os produtos cadastrados no `db.json`[cite: 7]. |
| `POST` | `/api/products` | Cadastra um novo produto no catálogo[cite: 7]. |
| `DELETE` | `/api/products/:id` | Remove um produto do catálogo pelo ID[cite: 7]. |
| `POST` | `/api/auth/login` | Autentica usuários e administradores[cite: 7]. |
| `GET` | `/api/orders` | Lista o histórico de pedidos realizados[cite: 7]. |
| `POST` | `/api/orders` | Registra um novo pedido, valida disponibilidade e abate o estoque no `db.json`[cite: 6, 7]. |

---

## 📂 Estrutura de Pastas

```text
Tech-Store/
├── backend/
│   ├── data/
│   │   └── db.json                 # Banco de dados documental JSON
│   ├── src/
│   │   └── server.ts               # Servidor Express e rotas da API REST
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/             # 10 Componentes Funcionais
    │   │   ├── AlertBanner.tsx
    │   │   ├── CartItemRow.tsx
    │   │   ├── CategoryFilter.tsx
    │   │   ├── Footer.tsx
    │   │   ├── Navbar.tsx
    │   │   ├── OrderSummary.tsx
    │   │   ├── ProductCard.tsx
    │   │   ├── ProductFormModal.tsx
    │   │   ├── SearchBar.tsx
    │   │   └── StatCard.tsx
    │   ├── context/
    │   │   └── ShopContext.tsx     # Context API e Custom Hook useShop
    │   ├── pages/                  # 5 Páginas da Aplicação
    │   │   ├── Cart.tsx
    │   │   ├── Catalog.tsx
    │   │   ├── Dashboard.tsx
    │   │   ├── Home.tsx
    │   │   └── Login.tsx
    │   ├── types/
    │   │   └── index.ts            # Interfaces TypeScript (Product, CartItem, User, Order)
    │   └── App.tsx                 # Configuração do React Router DOM
    └── package.json
```

---

## ⚙️ Como Executar o Projeto Localmente

### Pré-requisitos
* **Node.js** (v18 ou superior)
* **Git**

### 1. Clonar o repositório
```bash
git clone [https://github.com/teylonkkjk/Tech-Store.git](https://github.com/teylonkkjk/Tech-Store.git)
cd Tech-Store
```

### 2. Iniciar o Back-end (Porta 3001)
Abra um terminal e execute[cite: 7]:
```bash
cd backend
npm install
npm run dev
```
> O servidor estará ativo em `http://localhost:3001`[cite: 7].

### 3. Iniciar o Front-end (Porta 5173)
Abra um **segundo terminal** e execute[cite: 7]:
```bash
cd frontend
npm install
npm run dev
```
> Acesse a aplicação no navegador em `http://localhost:5173`[cite: 7].

---

## 👥 Equipe e Divisão de Responsabilidades

| Integrante | Componentes Funcionais | Páginas, Contexto e Back-end |
| :--- | :--- | :--- |
| **Teylon** | `Navbar.tsx` e `Footer.tsx` | Interfaces TypeScript (`types/index.ts`) e Rotas (`App.tsx`)[cite: 1, 2] |
| **Hudson** | `SearchBar.tsx` e `AlertBanner.tsx` | Estado Global (`ShopContext.tsx`) e Página `Home.tsx`[cite: 1, 3] |
| **Vanderley** | `CategoryFilter.tsx` e `ProductCard.tsx` | Página de Catálogo (`Catalog.tsx`) e Controle de Estoque[cite: 1, 4] |
| **Andre** | `CartItemRow.tsx` e `OrderSummary.tsx` | Página de Carrinho (`Cart.tsx`), Persistência e Checkout[cite: 1, 5] |
| **Gustavo** | `StatCard.tsx` e `ProductFormModal.tsx` | Páginas `Login.tsx`, `Dashboard.tsx` e API REST (`server.ts`)[cite: 1, 6] |
link apresentação yotube https://youtu.be/l-xyiuUCqf0?is=HOPu1PBydKW2kNo0
