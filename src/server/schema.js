import { gql } from '@apollo/client';

export const typeDefs = gql`
  type Warehouse {
    code: ID!
    name: String!
    city: String!
    country: String!
  }

  type Product {
    id: ID!
    name: String!
    sku: String!
    warehouse: String!
    stock: Int!
    demand: Int!
  }

  type KPI {
    date: String!
    stock: Int!
    demand: Int!
  }

  type Query {
    products(search: String, status: String, warehouse: String): [Product!]!
    warehouses: [Warehouse!]!
    kpis(range: String!): [KPI!]!
  }

  type Mutation {
    updateDemand(id: ID!, demand: Int!): Product!
    transferStock(id: ID!, from: String!, to: String!, qty: Int!): Product!
  }
`;

// Mock data
export const warehouses = [
  { code: "BLR-A", name: "Bangalore Alpha", city: "Bangalore", country: "India" },
  { code: "PNQ-C", name: "Pune Charlie", city: "Pune", country: "India" },
  { code: "DEL-B", name: "Delhi Beta", city: "Delhi", country: "India" },
  { code: "MUM-D", name: "Mumbai Delta", city: "Mumbai", country: "India" },
];

export const products = [
  { id: "P-1001", name: "12mm Hex Bolt", sku: "HEX-12-100", warehouse: "BLR-A", stock: 180, demand: 120 },
  { id: "P-1002", name: "Steel Washer", sku: "WSR-08-500", warehouse: "BLR-A", stock: 50, demand: 80 },
  { id: "P-1003", name: "M8 Nut", sku: "NUT-08-200", warehouse: "PNQ-C", stock: 80, demand: 80 },
  { id: "P-1004", name: "Bearing 608ZZ", sku: "BRG-608-50", warehouse: "DEL-B", stock: 24, demand: 120 },
  { id: "P-1005", name: "Stainless Steel Screw", sku: "SCR-SS-300", warehouse: "MUM-D", stock: 200, demand: 150 },
  { id: "P-1006", name: "Rubber Gasket", sku: "GSK-RB-100", warehouse: "BLR-A", stock: 75, demand: 90 },
  { id: "P-1007", name: "Aluminum Plate", sku: "PLT-AL-250", warehouse: "PNQ-C", stock: 45, demand: 60 },
  { id: "P-1008", name: "Copper Wire", sku: "WIR-CU-500", warehouse: "DEL-B", stock: 120, demand: 100 },
  { id: "P-1009", name: "Plastic Connector", sku: "CON-PL-200", warehouse: "MUM-D", stock: 30, demand: 45 },
  { id: "P-1010", name: "Carbon Steel Rod", sku: "ROD-CS-150", warehouse: "BLR-A", stock: 85, demand: 85 },
  { id: "P-1011", name: "Brass Bushing", sku: "BSH-BR-075", warehouse: "PNQ-C", stock: 60, demand: 70 },
  { id: "P-1012", name: "Nylon Spacer", sku: "SPC-NY-010", warehouse: "DEL-B", stock: 140, demand: 90 },
  { id: "P-1013", name: "Zinc Plated Screw", sku: "SCR-ZN-120", warehouse: "MUM-D", stock: 110, demand: 95 },
  { id: "P-1014", name: "Hex Key Set", sku: "KEY-HX-SET", warehouse: "BLR-A", stock: 22, demand: 40 },
  { id: "P-1015", name: "Stainless Clamp", sku: "CLP-SS-050", warehouse: "PNQ-C", stock: 95, demand: 130 },
  { id: "P-1016", name: "PVC Tube", sku: "TUB-PVC-300", warehouse: "DEL-B", stock: 300, demand: 200 },
  { id: "P-1017", name: "Ceramic Fuse", sku: "FUS-CR-005", warehouse: "MUM-D", stock: 48, demand: 52 },
  { id: "P-1018", name: "Thermal Paste", sku: "THM-PST-020", warehouse: "BLR-A", stock: 180, demand: 210 },
  { id: "P-1019", name: "Spring Washer", sku: "WSR-SP-300", warehouse: "PNQ-C", stock: 250, demand: 240 },
  { id: "P-1020", name: "Tension Spring", sku: "SPR-TN-060", warehouse: "DEL-B", stock: 70, demand: 120 },
  { id: "P-1021", name: "Grease Cartridge", sku: "GRS-CT-400", warehouse: "MUM-D", stock: 40, demand: 75 },
  { id: "P-1022", name: "O-Ring Set", sku: "ORG-SET-100", warehouse: "BLR-A", stock: 160, demand: 140 },
  { id: "P-1023", name: "Allen Bolt M6", sku: "BLT-AL-006", warehouse: "PNQ-C", stock: 95, demand: 85 },
  { id: "P-1024", name: "Flanged Nut M10", sku: "NUT-FL-010", warehouse: "DEL-B", stock: 55, demand: 90 },
  { id: "P-1025", name: "Stainless Rivet", sku: "RVT-SS-100", warehouse: "MUM-D", stock: 400, demand: 350 },
  { id: "P-1026", name: "Cable Tie 200mm", sku: "TIE-CB-200", warehouse: "BLR-A", stock: 500, demand: 420 },
  { id: "P-1027", name: "Heat Shrink 3mm", sku: "HSK-003-100", warehouse: "PNQ-C", stock: 130, demand: 110 },
  { id: "P-1028", name: "Solder Wire 60/40", sku: "SLD-6040-250", warehouse: "DEL-B", stock: 85, demand: 125 },
  { id: "P-1029", name: "Ball Bearing 6202", sku: "BRG-6202-20", warehouse: "MUM-D", stock: 28, demand: 70 },
  { id: "P-1030", name: "Plastic Cap 10mm", sku: "CAP-PL-010", warehouse: "BLR-A", stock: 220, demand: 180 },
  { id: "P-1031", name: "Rubber Foot Pad", sku: "PAD-RB-040", warehouse: "PNQ-C", stock: 60, demand: 55 },
  { id: "P-1032", name: "Silicone Sealant", sku: "SLN-SI-300", warehouse: "DEL-B", stock: 190, demand: 210 },
  { id: "P-1033", name: "Threadlocker Blue", sku: "THR-LOC-050", warehouse: "MUM-D", stock: 35, demand: 65 },
  { id: "P-1034", name: "Metal Spacer 5mm", sku: "SPC-MT-005", warehouse: "BLR-A", stock: 145, demand: 130 },
  { id: "P-1035", name: "DIN Rail 35mm", sku: "RAIL-35-100", warehouse: "PNQ-C", stock: 90, demand: 140 },
  { id: "P-1036", name: "Crimp Terminal M4", sku: "CRM-M4-200", warehouse: "DEL-B", stock: 260, demand: 220 },
  { id: "P-1037", name: "Velcro Strap 30cm", sku: "VLC-030-050", warehouse: "MUM-D", stock: 70, demand: 95 },
  { id: "P-1038", name: "Stainless Shim 0.2mm", sku: "SHM-SS-020", warehouse: "BLR-A", stock: 44, demand: 80 },
  { id: "P-1039", name: "PTFE Tape", sku: "PTF-TAP-010", warehouse: "PNQ-C", stock: 320, demand: 310 },
  { id: "P-1040", name: "Galvanized Angle", sku: "ANG-GL-050", warehouse: "DEL-B", stock: 18, demand: 40 },
  { id: "P-1041", name: "Cable Gland PG9", sku: "GLD-PG9-050", warehouse: "MUM-D", stock: 150, demand: 170 },
  { id: "P-1042", name: "Stainless Wire Mesh", sku: "MSH-SS-100", warehouse: "BLR-A", stock: 65, demand: 60 },
  { id: "P-1043", name: "Brass Nozzle 0.4mm", sku: "NZL-BR-004", warehouse: "PNQ-C", stock: 42, demand: 90 },
  { id: "P-1044", name: "Steel Pipe 1/2\"", sku: "PIP-ST-050", warehouse: "DEL-B", stock: 88, demand: 120 },
  { id: "P-1045", name: "Aluminum Extrusion 2020", sku: "EXT-AL-2020", warehouse: "MUM-D", stock: 210, demand: 180 }
];

// Generate KPI data for different time ranges
export const generateKPIData = (range) => {
  const days = range === '7d' ? 7 : range === '14d' ? 14 : 30;
  const data = [];

  // Deterministic pseudo-random generator based on a string seed
  const seeded = (seedStr) => {
    let h = 2166136261;
    for (let i = 0; i < seedStr.length; i++) {
      h ^= seedStr.charCodeAt(i);
      h += (h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24); // FNV-like mixing
    }
    // Convert to 0..1
    const u = (h >>> 0) / 4294967295;
    return u;
  };

  const baseStock = products.reduce((sum, p) => sum + p.stock, 0);
  const baseDemand = products.reduce((sum, p) => sum + p.demand, 0);
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const iso = date.toISOString().split('T')[0];

    // Seed per date and range for stable yet varied values
    const stockSeed = seeded(`${iso}-stock-${range}`) - 0.5; // -0.5..0.5
    const demandSeed = seeded(`${iso}-demand-${range}`) - 0.5;

    const stockVariation = stockSeed * 0.2; // ±10%
    const demandVariation = demandSeed * 0.15; // ±7.5%
    
    data.push({
      date: iso,
      stock: Math.round(baseStock * (1 + stockVariation)),
      demand: Math.round(baseDemand * (1 + demandVariation)),
    });
  }
  
  return data;
};

export const resolvers = {
  Query: {
    products: (_, { search, status, warehouse }) => {
      let filtered = [...products];
      
      if (search) {
        const searchLower = search.toLowerCase();
        filtered = filtered.filter(p => 
          p.name.toLowerCase().includes(searchLower) ||
          p.sku.toLowerCase().includes(searchLower) ||
          p.id.toLowerCase().includes(searchLower)
        );
      }
      
      if (warehouse && warehouse !== 'all') {
        filtered = filtered.filter(p => p.warehouse === warehouse);
      }
      
      if (status && status !== 'all') {
        filtered = filtered.filter(p => {
          const productStatus = p.stock > p.demand ? 'healthy' : 
                               p.stock === p.demand ? 'low' : 'critical';
          return productStatus === status;
        });
      }
      
      return filtered;
    },
    warehouses: () => warehouses,
    kpis: (_, { range }) => generateKPIData(range),
  },
  
  Mutation: {
    updateDemand: (_, { id, demand }) => {
      const product = products.find(p => p.id === id);
      if (product) {
        product.demand = demand;
      }
      return product;
    },
    
    transferStock: (_, { id, from, to, qty }) => {
      const product = products.find(p => p.id === id);
      if (product && product.warehouse === from) {
        product.stock = Math.max(0, product.stock - qty);
        // In a real app, you'd create a new product entry for the destination warehouse
        // For this demo, we'll just update the current product's warehouse
        product.warehouse = to;
        product.stock += qty;
      }
      return product;
    },
  },
};
