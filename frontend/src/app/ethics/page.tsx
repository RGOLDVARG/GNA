'use client';
import React, { useState, useRef } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useAuth } from '@/context/AuthContext';
import { ShieldCheck, Users, GraduationCap, Building2, CheckCircle2, Printer, Scale, Landmark } from 'lucide-react';

export default function EthicsPage() {
  const { user, authenticatedFetch } = useAuth();
  const [activeTab, setActiveTab] = useState('specialists');
  const [isSigning, setIsSigning] = useState(false);
  const [signed, setSigned] = useState(false);

  const handleSignMandate = async () => {
    setIsSigning(true);
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      const res = await authenticatedFetch(`${API_URL}/api/update-profile/`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ expertise: (user?.expertise || '') + ', Ethics Verified' })
      });
      if (res.ok) setSigned(true);
    } catch (err) { console.error(err); } finally { setIsSigning(false); }
  };

  const handlePrint = () => { window.print(); };

  return (
    <main style={{ backgroundColor: '#FDFCFB', minHeight: '100vh', fontFamily: "'Inter', sans-serif" }}>
      <div className="no-print"><Navbar /></div>

      <section className="no-print ethics-hero">
        <div className="mesh-gradient-overlay"></div>
        <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
           <h1 className="ethics-hero-title">Global Regulatory <br/> <span style={{ color: '#C5A059' }}>Codex 2026</span></h1>
           <p className="ethics-hero-subtext">Official Institutional Mandate for the Global Neurodiversity Ecosystem.</p>
        </div>
      </section>

      <section className="no-print tab-navigation-section">
        <div className="container tab-container">
          <div className="tab-buttons">
            <TabButton active={activeTab === 'specialists'} onClick={() => setActiveTab('specialists')} icon={<Users size={20} />} label="GNA-PSCC: Specialists" />
            <TabButton active={activeTab === 'clinics'} onClick={() => setActiveTab('clinics')} icon={<Building2 size={20} />} label="GNA-IAS: Institutions" />
            <TabButton active={activeTab === 'education'} onClick={() => setActiveTab('education')} icon={<GraduationCap size={20} />} label="GNA-EQCC: Education" />
          </div>
          <div className="print-btn-container">
             <button onClick={handlePrint} className="print-action-btn"><Printer size={18} /> <span className="print-text">Print Official Copy</span></button>
          </div>
        </div>
      </section>

      <div className="container print-container document-section">
        <div className="document-viewport">
          <div className="printable-document">
            
            <div className="doc-header">
               <div>
                  <img src="/images/gna_logo.svg" alt="GNA" style={{ height: '48px' }} />
                  <div style={{ fontSize: '10px', fontWeight: 900, color: '#120A2B', letterSpacing: '0.4em', marginTop: '16px' }}>OFFICE OF GLOBAL REGULATORY COMPLIANCE</div>
               </div>
               <div className="doc-meta">
                  <div style={{ fontSize: '14px', fontWeight: 900, color: '#120A2B' }}>DOC-ID: GNA-CODEX-2026-V1</div>
                  <div style={{ fontSize: '14px', color: '#64748B', fontWeight: 700 }}>LEGAL EFFECT: IMMEDIATE</div>
               </div>
            </div>

            {activeTab === 'specialists' && (
              <div id="pscc-section">
                <h2 className="doc-title">GNA-PSCC-2026: Specialist Code of Conduct</h2>
                <div className="points-grid">
                  <Point num="1.0" title="Clinical Boundaries & Scope of Practice" text="Specialists are mandated to operate strictly within the parameters of their verified academic qualifications and clinical licenses. A GNA member must not misrepresent their authority to diagnose, prescribe, or provide clinical intervention if their credentials are restricted to coaching, education, or social support." />
                  <Point num="2.0" title="Informed Consent in Neurodivergent Contexts" text="Consent must be obtained through methods that accommodate the individual’s communication profile. This requires the use of Augmentative and Alternative Communication (AAC), visual supports, or extended processing time where necessary." />
                  <Point num="3.0" title="Protection of Children & Minimization of Trauma" text="The GNA-PSCC-2026 holds a zero-tolerance policy for behavioral modification techniques that utilize physical restraint, sensory deprivation, or psychological coercion (e.g. forced eye contact or the suppression of non-harmful stimming). Specialists are required to employ trauma-informed, neuro-affirming strategies." />
                  <Point num="4.0" title="Safeguarding Adult Autonomy & Supported Decision-Making" text="For adults with high support needs, specialists must facilitate 'Supported Decision-Making' models rather than paternalistic substitution. This involves providing information in accessible formats and working alongside designated support persons." />
                  <Point num="5.0" title="Neuro-Affirming Methodology & Paradigm Alignment" text="GNA members are required to reject the 'medical deficit' model in favor of the neurodiversity paradigm. Clinical practice must focus on identifying and supporting functional barriers within the individual's environment." />
                  <Point num="6.0" title="Diagnostic Integrity & Multi-Axial Assessment Standards" text="Diagnostic reports must be comprehensive, multi-axial, and evidence-based. A diagnosis must never be rendered based solely on checklist compliance; it must include observations of sensory processing, executive functioning, and communication styles." />
                  <Point num="7.0" title="Data Sovereignty & Client Dossier Protection" text="Specialists act as temporary custodians of highly sensitive neuro-data. The GNA mandate requires end-to-end encryption for all digital records and the immediate provision of records to the client upon request." />
                  <Point num="8.0" title="Specialist Duty of Well-being & Burnout Prevention" text="Recognizing that professional burnout is a significant risk to patient safety, specialists have a mandatory duty to maintain their own psychological well-being. This includes adhering to maximum caseload limits." />
                  <Point num="9.0" title="Transparency in Fee Structures & Commercial Ethics" text="Specialists must disclose all costs, including hidden administrative or reporting fees, prior to the commencement of any engagement. Predatory pricing models are strictly forbidden." />
                  <Point num="10.0" title="Conflicts of Interest & Institutional Neutrality" text="Any affiliation with pharmaceutical companies, private schools, or service providers that may influence clinical recommendations must be disclosed in writing. Specialists must maintain clinical independence." />
                  <Point num="11.0" title="Continuous Professional Education (CPE) Compliance" text="Members must complete 40 hours of GNA-certified continuing education every 24 months. At least 10 of these hours must be dedicated specifically to 'Current Neuro-Affirming Research'." />
                  <Point num="12.0" title="Respect for Communication Diversity & Facilitation" text="Specialists must acknowledge and respect all forms of communication, including non-speaking, minimally verbal, and alternative modalities. Specialists are mandated to facilitate the most effective communication mode." />
                  <Point num="13.0" title="Sensory Profile Accommodations in Clinical Settings" text="It is the specialist's duty to ensure the clinical environment does not cause sensory overload or pain. This involves adjusting lighting, minimizing background noise, and permitting the use of sensory tools." />
                  <Point num="14.0" title="Ethical Referral & Interdisciplinary Cooperation" text="The GNA promotes a 'Total Care' model. Specialists are required to collaborate with other members of the client's support team (OT, SLP, Educators) to ensure a unified support pathway." />
                  <Point num="15.0" title="Public Representation & Digital Professionalism" text="When engaging in public discourse or social media, specialists must maintain the dignity of the neurodiversity profession. This includes refraining from sharing identifiable patient data." />
                  <Point num="16.0" title="Emergency & Crisis Intervention Standards" text="In crisis situations, specialists must utilize non-violent, de-escalation techniques that prioritize the individual's dignity and physical safety. Police intervention must be the absolute last resort." />
                  <Point num="17.0" title="Anti-Discrimination & Clinical Intersectionality" text="The GNA-PSCC requires specialists to acknowledge the intersection of neurodivergence with race, gender identity, and socioeconomic status. Clinical bias must be actively countered." />
                  <Point num="18.0" title="Whistleblower Protocol & Duty to Report" text="Members have a regulatory 'Duty of Candor' to report any witnessed unethical conduct by other GNA-accredited professionals. This protocol is designed to protect the integrity of the Registry." />
                  <Point num="19.0" title="Research Ethics & Participant Protection" text="Any GNA member participating in research must ensure the study follows the 'Nothing About Us Without Us' principle. Participants must have the right to withdraw at any time." />
                  <Point num="20.0" title="Validation of Self-Diagnosis & Lived Experience" text="GNA specialists are mandated to treat self-identified neurodivergent individuals with professional respect and validation. The specialist must acknowledge the validity of the individual’s lived experience." />
                  <Point num="21.0" title="Prohibition of Social Masking Enforcement" text="Specialists must not encourage or train clients to 'mask' their neurodivergent traits for social assimilation. Intervention must focus on building self-advocacy skills." />
                  <Point num="22.0" title="Parental Support & Home Environment Optimization" text="When working with families, specialists must provide support that empowers parents without inducing 'parent-blame.' The focus should be on optimizing the home sensory environment." />
                  <Point num="23.0" title="Compliance with Global Disability Rights Laws" text="All GNA members are expected to be familiar with and adhere to the UN Convention on the Rights of Persons with Disabilities (CRPD)." />
                  <Point num="24.0" title="Duty of Candor & Transparency in Clinical Errors" text="When a professional error occurs—be it a misdiagnosis or a failed intervention—the specialist is mandated to disclose the error to the client/family immediately." />
                  <Point num="25.0" title="Preservation of Professional Independence" text="Specialists must not allow their clinical judgment to be compromised by institutional KPIs, insurance company requirements, or government quotas." />
                </div>
              </div>
            )}

            {activeTab === 'clinics' && (
              <div id="ias-section">
                <h2 className="doc-title">GNA-IAS-2026: Institutional Quality Standards</h2>
                <div className="points-grid">
                  <Point num="I-1" title="Sensory-Safe Architectural Design" text="Institutions must provide proof of sensory-optimized environments, including LED lighting <3000K, acoustic treatment for reverb reduction, and dedicated 'Total Dark/Quiet' regulation rooms." />
                  <Point num="I-2" title="Staff Training & Saturation" text="100% of staff—including non-clinical administration—must undergo GNA-approved neuro-inclusive communication training. Awareness of meltdowns vs. defiance is a mandatory KPI." />
                  <Point num="I-3" title="Mandatory Regulation Zones" text="Dedicated low-stimulus zones must be available for both patients and staff members, equipped with weighted items and sensory regulation tools." />
                  <Point num="I-4" title="Neuro-Inclusive Hiring Protocols" text="Accredited institutions must demonstrate an active commitment to hiring neurodivergent professionals across all departments." />
                  <Point num="I-5" title="Data Security & Patient Dossier Sovereignty" text="Infrastructure must utilize end-to-end encryption for all neuro-records. Patients must be provided with a 'Digital Key' to revoke access to their records at any time." />
                  <Point num="I-6" title="Interdisciplinary Oversight Boards" text="Internal committees to review complex cases, ensuring that no single practitioner's bias dominates the care pathway." />
                  <Point num="I-7" title="Anonymous Patient Feedback Channels" text="Provision of accessible, anonymous portals for patients to report sensory discomfort or ethical breaches without fear of service denial." />
                  <Point num="I-8" title="Crisis De-escalation & Physical Safety" text="Strict prohibition of physical restraint or chemical sedation for behavioral management. Documentation of trauma-informed de-escalation protocols must be available." />
                  <Point num="I-9" title="Accessibility Parity (Physical & Digital)" text="Exceeding local ADA requirements. This includes AAC devices, sensory-friendly booking systems, and clear signage throughout the facility." />
                  <Point num="I-10" title="Governance Transparency & Funding Disclosure" text="Full disclosure of institutional funding sources, board affiliations, and commercial ties to pharmaceutical corporations." />
                  <Point num="I-11" title="Community Integration & Advocacy Support" text="Evidence of active support for local neuro-advocacy groups. Allocation of at least 5% of operational budget to community-led initiatives." />
                  <Point num="I-12" title="Sustainability of Care (Continuity)" text="Institutional financial models must ensure that support for long-term patients is not abruptly terminated due to administrative shifts." />
                  <Point num="I-13" title="Ethical Research & Bioethics Committee" text="Any clinical trials conducted within the facility must be overseen by a committee that includes at least 30% neurodivergent community representation." />
                  <Point num="I-14" title="Clinical KPI Monitoring & Disclosure" text="Monthly submission of quality metrics to GNA, including patient quality-of-life scores and sensory safety compliance." />
                  <Point num="I-15" title="Unannounced Audit Cooperation" text="Institutional partners agree to 24/7 unannounced inspections. Denial of entry results in immediate suspension of accreditation." />
                </div>
              </div>
            )}

            {activeTab === 'education' && (
              <div id="eqcc-section">
                <h2 className="doc-title">GNA-EQCC-2026: Educational Quality Charter</h2>
                <div className="points-grid">
                  <Point num="E-1" title="Evidence-Based Curricular Integrity" text="Course content must be updated annually with peer-reviewed research from the last 24 months. Outdated 'deficit' models are prohibited." />
                  <Point num="E-2" title="Faculty Clinical Standing" text="Lead instructors must hold active GNA Specialist accreditation and have a minimum of 500 hours of verified clinical practice." />
                  <Point num="E-3" title="Inclusive Assessment Architectures" text="Assessment methods must accommodate neurodivergent learning styles. No failure based solely on executive function difficulties." />
                  <Point num="E-4" title="Student Welfare & Burnout Protection" text="Documented policies for burnout prevention and mental health support for practitioners-in-training." />
                  <Point num="E-5" title="Peer-Review of Curricular Content" text="Courses must undergo external review by a panel of GNA-accredited peers and advocates every 12 months." />
                  <Point num="E-6" title="Practical Fieldwork & Mentorship" text="Mandatory 100 hours of clinical or fieldwork under direct supervision of a GNA Fellow or Senior Specialist." />
                  <Point num="E-7" title="Global Recognition & Credential Portability" text="Alignment with international standards for credentialing, ensuring certification is recognized globally." />
                  <Point num="E-8" title="Ethical Marketing & Value Disclosure" text="Zero-tolerance for predatory marketing or 'get-rich-quick' claims. Clear statement of professional limitations." />
                  <Point num="E-9" title="Continuous Quality Improvement" text="Active feedback loops where student outcomes directly influence curriculum revisions." />
                  <Point num="E-10" title="Diversity in Instruction" text="Ensuring faculty includes professionals with lived neurodivergent experience (at least 25% of instruction)." />
                </div>
              </div>
            )}

            <div className="doc-footer">
               <Landmark size={48} color="#C5A059" style={{ opacity: 0.3, flexShrink: 0 }} />
               <p style={{ fontSize: '13px', color: '#64748B', fontStyle: 'italic', margin: 0 }}>This Codex is a binding regulatory instrument. All signatures recorded are legally verified commitments.</p>
            </div>
          </div>
        </div>

        {user && activeTab === 'specialists' && !signed && (
          <div className="no-print attestation-box">
             <ShieldCheck size={48} color="#00D1FF" style={{ margin: '0 auto 20px' }} />
             <h3 style={{ margin: 0, fontSize: '28px', fontWeight: 900 }}>Member Digital Signature</h3>
             <p style={{ color: 'rgba(255,255,255,0.6)', margin: '16px 0 32px' }}>I certify that I have read and will abide by all 25 articles of the GNA-PSCC-2026 Codex.</p>
             <button onClick={handleSignMandate} disabled={isSigning} className="sign-btn">Accept & Sign Unified Codex</button>
          </div>
        )}
        {signed && (
          <div className="no-print success-box"><CheckCircle2 size={32} /> Signature Verified. GNA Profile Updated.</div>
        )}
      </div>
      
      <div className="no-print"><Footer /></div>

      <style jsx>{`
        .ethics-hero {
          background: #120A2B;
          padding: 120px 0;
          position: relative;
          overflow: hidden;
        }
        .mesh-gradient-overlay {
          position: absolute;
          inset: 0;
          opacity: 0.6;
          background-image: radial-gradient(circle at 20% 30%, #3A0F7E 0%, transparent 50%), radial-gradient(circle at 80% 70%, #120A2B 0%, transparent 50%);
        }
        .ethics-hero-title {
          font-size: 5rem;
          font-weight: 900;
          color: #FFFFFF;
          line-height: 1;
          letter-spacing: -0.04em;
          margin-bottom: 24px;
        }
        .ethics-hero-subtext {
          font-size: 1.4rem;
          color: #FFFFFF;
          opacity: 0.8;
          max-width: 800px;
          margin: 0 auto;
        }
        .tab-navigation-section {
          background-color: #FFFFFF;
          border-bottom: 1px solid #E2E8F0;
          position: sticky;
          top: 80px;
          z-index: 100;
        }
        .tab-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .tab-buttons {
          display: flex;
          gap: 60px;
          justify-content: center;
          flex: 2;
          overflow-x: auto;
          scrollbar-width: none; /* Firefox */
        }
        .tab-buttons::-webkit-scrollbar {
          display: none; /* Chrome */
        }
        .print-btn-container {
          flex: 1;
          display: flex;
          justify-content: flex-end;
        }
        .print-action-btn {
          background: #120A2B;
          color: white;
          border: none;
          padding: 12px 32px;
          border-radius: 100px;
          font-weight: 900;
          font-size: 14px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 10px;
          white-space: nowrap;
        }
        .document-section {
          padding: 80px 0 160px 0;
        }
        .document-viewport {
          height: 850px;
          overflow-y: auto;
          border-radius: 12px;
          background: #F1F3F5;
          padding: 40px;
          box-shadow: inset 0 2px 20px rgba(0,0,0,0.05);
          border: 1px solid #E2E8F0;
        }
        .printable-document {
          background: white;
          padding: 120px 140px;
          box-shadow: 0 30px 100px rgba(0,0,0,0.1);
          min-height: 1200px;
        }
        .doc-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 80px;
          border-bottom: 3px solid #120A2B;
          padding-bottom: 32px;
        }
        .doc-meta {
          text-align: right;
        }
        .doc-title {
          font-size: 48px;
          font-weight: 900;
          color: #120A2B;
          margin-bottom: 60px;
          letter-spacing: -0.04em;
        }
        .doc-footer {
          margin-top: 100px;
          border-top: 2px solid #E2E8F0;
          padding-top: 40px;
          display: flex;
          gap: 32px;
          align-items: center;
        }
        .points-grid {
          display: flex;
          flex-direction: column;
        }
        .point-box {
          border-bottom: 1px solid #F1F5F9;
          padding: 48px 0;
        }
        .point-header {
          display: flex;
          align-items: center;
          gap: 20px;
          margin-bottom: 20px;
        }
        .point-num {
          font-size: 20px;
          font-weight: 900;
          color: #C5A059;
          flex-shrink: 0;
        }
        .point-title {
          font-size: 24px;
          font-weight: 900;
          color: #120A2B;
          margin: 0;
        }
        .point-text {
          font-size: 17px;
          color: #475569;
          line-height: 1.9;
          margin: 0;
          padding-left: 40px;
        }
        .attestation-box {
          margin-top: 100px;
          background: #120A2B;
          padding: 80px;
          border-radius: 48px;
          color: white;
          text-align: center;
        }
        .sign-btn {
          background: #00D1FF;
          color: #120A2B;
          padding: 20px 56px;
          border-radius: 16px;
          border: none;
          font-weight: 900;
          font-size: 18px;
          cursor: pointer;
        }
        .success-box {
          margin-top: 60px;
          background: #ECFDF5;
          border: 2px solid #059669;
          padding: 40px;
          border-radius: 32px;
          color: #059669;
          font-weight: 900;
          display: flex;
          align-items: center;
          gap: 24px;
        }

        @media (max-width: 768px) {
          .ethics-hero {
            padding: 80px 0 60px;
          }
          .ethics-hero-title {
            font-size: 2.5rem;
          }
          .ethics-hero-subtext {
            font-size: 1.1rem;
          }
          .tab-container {
            flex-direction: column;
            padding: 0;
          }
          .tab-buttons {
            width: 100%;
            justify-content: flex-start;
            gap: 20px;
            padding: 0 20px;
          }
          .print-btn-container {
            display: none; /* Hide print on mobile */
          }
          .document-section {
            padding: 40px 0 80px 0;
          }
          .document-viewport {
            padding: 20px;
            height: auto;
            max-height: 70vh;
            border-radius: 20px;
          }
          .printable-document {
            padding: 40px 24px;
            min-height: auto;
          }
          .doc-header {
            flex-direction: column;
            gap: 20px;
            margin-bottom: 40px;
          }
          .doc-meta {
            text-align: left;
          }
          .doc-title {
            font-size: 32px;
            margin-bottom: 40px;
          }
          .point-box {
            padding: 32px 0;
          }
          .point-header {
            align-items: flex-start;
          }
          .point-title {
            font-size: 20px;
            line-height: 1.3;
          }
          .point-text {
            font-size: 15px;
            padding-left: 0;
            margin-top: 16px;
          }
          .doc-footer {
            flex-direction: column;
            align-items: flex-start;
            gap: 20px;
            margin-top: 60px;
          }
          .attestation-box {
            padding: 40px 24px;
            border-radius: 32px;
            margin-top: 60px;
          }
          .sign-btn {
            width: 100%;
            padding: 20px;
            font-size: 16px;
          }
        }
      `}</style>
      
      <style jsx global>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; padding: 0 !important; margin: 0 !important; }
          main { background: white !important; }
          .container.print-container { max-width: 100% !important; padding: 0 !important; margin: 0 !important; }
          .document-viewport { height: auto !important; overflow: visible !important; background: white !important; padding: 0 !important; border: none !important; box-shadow: none !important; }
          .printable-document { box-shadow: none !important; border: none !important; padding: 0 !important; margin: 0 !important; width: 100% !important; min-height: auto !important; }
          h2, h3, p { color: black !important; }
        }
      `}</style>
    </main>
  );
}

function TabButton({ active, onClick, icon, label }: any) {
  return (<button onClick={onClick} style={{ padding: '24px 0', background: 'none', border: 'none', borderBottom: active ? '4px solid #C5A059' : '4px solid transparent', color: active ? '#120A2B' : '#94A3B8', fontWeight: 900, fontSize: '14px', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', transition: 'all 0.2s', whiteSpace: 'nowrap' }}>{icon} {label}</button>);
}

function Point({ num, title, text }: any) {
  return (
    <div className="point-box">
       <div className="point-header"><span className="point-num">{num}</span><h4 className="point-title">{title}</h4></div>
       <p className="point-text">{text}</p>
    </div>
  );
}
