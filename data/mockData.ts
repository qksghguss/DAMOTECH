export const users = [
  {
    id: "user-1",
    username: "user1",
    name: "홍길동",
    processCode: "PRC-001",
    role: "USER" as const,
    password: "password123",
    active: true
  },
  {
    id: "admin-1",
    username: "admin",
    name: "관리자",
    processCode: "HQ",
    role: "ADMIN" as const,
    password: "admin123",
    active: true
  }
];

export const items = [
  {
    id: "itm-1",
    code: "A-100",
    name: "A4 복사용지",
    spec: "80g, 500매",
    baseUom: "EA",
    packUom: "BOX",
    packFactor: 5,
    minStock: 10,
    listPrice: 18000
  },
  {
    id: "itm-2",
    code: "C-210",
    name: "볼펜",
    spec: "0.7mm 블루",
    baseUom: "EA",
    packUom: "BOX",
    packFactor: 12,
    minStock: 20,
    listPrice: null
  }
];

export const inventory = [
  {
    id: "inv-1",
    itemId: "itm-1",
    location: "서울 본사",
    qtyBase: 42,
    lotNo: "2024-05",
    expiry: null
  },
  {
    id: "inv-2",
    itemId: "itm-2",
    location: "공장 A",
    qtyBase: 15,
    lotNo: null,
    expiry: null
  }
];

export const requests = [
  {
    id: "req-1",
    type: "ISSUE" as const,
    requesterId: "user-1",
    itemId: "itm-1",
    qty: 10,
    uom: "EA",
    status: "준비중",
    createdAt: "2024-05-30T09:00:00Z"
  },
  {
    id: "req-2",
    type: "PURCHASE" as const,
    requesterId: "user-1",
    freeItemName: "전동 드라이버",
    qty: 2,
    uom: "EA",
    proposedPrice: 180000,
    status: "승인",
    linkUrl: "https://example.com/tool",
    createdAt: "2024-05-28T01:10:00Z"
  }
];

export const issues = [
  {
    id: "iss-1",
    requestId: "req-1",
    issuedQty: 5,
    issuedAt: "2024-05-31T02:00:00Z"
  }
];

export const purchases = [
  {
    id: "pur-1",
    requestId: "req-2",
    status: "발주",
    orderedQty: 2,
    expectedDate: "2024-06-10"
  }
];

export const receipts = [
  {
    id: "rcp-1",
    purchaseId: "pur-1",
    receivedQty: 2,
    unitCost: 175000,
    receivedAt: "2024-06-12T05:00:00Z"
  }
];

export const settings = {
  costingMethod: "평균법",
  approvalRule: "10만원 초과 시 관리자 승인",
  safetyStockPolicy: "품목별 최소재고 유지",
  notifications: ["슬랙", "이메일"]
};

export const logs = [
  {
    id: "log-1",
    message: "홍길동이 A4 복사용지 10EA 지급 요청",
    createdAt: "2024-05-30T09:00:00Z"
  },
  {
    id: "log-2",
    message: "관리자가 전동 드라이버 구매요청 승인",
    createdAt: "2024-05-28T02:00:00Z"
  }
];
