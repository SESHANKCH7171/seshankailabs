export const sections = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "capabilities", label: "Capabilities" },
  { id: "proof", label: "Proof" },
  { id: "contact", label: "Contact" },
];

export const valueCards = [
  {
    id: "rag",
    system: "SYSTEM 01",
    title: "Tender Intelligence Engine",
    pain: "Your team reads a 300-page RFP. It takes 3 days.",
    capability:
      "We deploy an intelligent document processing pipeline that extracts every specification, tolerance margin, and compliance clause in under 10 minutes. Machine-readable. Searchable. Auditable.",
    tags: ["DOCUMENT INTELLIGENCE", "DRDO / HAL RFPS"],
  },
  {
    id: "quality",
    system: "SYSTEM 02",
    title: "Compliance Documentation Engine",
    pain: "AS9100 and DGAQA audit prep takes weeks of manual formatting.",
    capability:
      "We automate generation of quality management records, inspection reports, and audit-ready documentation — reducing prep time by 60–80%.",
    tags: ["AS9100", "DGAQA", "QUALITY MANAGEMENT"],
  },
  {
    id: "supply",
    system: "SYSTEM 03",
    title: "Supply Chain Visibility Agent",
    pain: "You don't know where your sub-tier materials are until it's already late.",
    capability:
      "Autonomous workflow agents monitor raw material flow across your MIDC supplier network with live status dashboards and exception alerts.",
    tags: ["AUTOMATED WORKFLOWS", "SUPPLY CHAIN", "MIDC NETWORK"],
  },
];

export const demoData = [
  {
    id: "EOI/11BRD/ISC/2026-27",
    doc: "Unified Engine Tester SKD-33",
    param: "Frequency Error Margin: ±0.03%",
    confidence: "99.1%",
  },
  {
    id: "RFP/HAL/OZR/2025-18",
    doc: "Component Inspection Checklist",
    param: "Surface Finish Ra: 0.8μm",
    confidence: "98.4%",
  },
  {
    id: "DRDO/TENDER/2026/044",
    doc: "Material Specification Sheet",
    param: "Tensile Strength: 1250 MPa",
    confidence: "97.7%",
  },
  {
    id: "MoD/MSME/2026/TIER2/09",
    doc: "Supplier Qualification Audit",
    param: "Dimensional Tolerance: ±0.005mm",
    confidence: "96.9%",
  },
  {
    id: "BEL/SUPPLY/2025/EOI-33",
    doc: "PCB Procurement RFQ",
    param: "IPC Class III Compliance",
    confidence: "99.8%",
  },
];
