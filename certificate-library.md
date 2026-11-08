# Certificate library — installed

All 13 certificates are live on the site under `public/assets/certifications/`. Each entry has:

- a **preview image** (`<slug>.jpg`, 1400 px wide) used in the card grid and the viewer,
- an **original document** (`files/<slug>.pdf` or `files/<slug>.jpg`) linked from "Open original" / "Download".

| # | Certificate | Issuer | Date on certificate | Credential no. | Preview file |
|---|---|---|---|---|---|
| 1 | Huawei Certified Specialist Associate — O&M (DCS) | Huawei | valid through 08 Aug 2028 | 0329010187810446411409 | `huawei-hcsa-om-dcs.jpg` |
| 2 | xFusion FCIA — Server | xFusion | granted 20 Nov 2025 (2 yrs) | XFU01FCIA011783 | `xfusion-fcia-server.jpg` |
| 3 | xFusion FCIP — FusionOne HCI | xFusion | granted 08 Dec 2025 (2 yrs) | XFU03FCIP010153 | `xfusion-fcip-fusionone-hci.jpg` |
| 4 | HPE Standard ProLiant and Blade Server Service and Solution Qualification | HPE | 04 Feb 2025 | — | `hpe-standard-proliant-blade-server.jpg` |
| 5 | HPE StoreEasy ProLiant-Based NAS Service and Solution Qualification | HPE | 17 Jun 2025 | — | `hpe-storeeasy-nas.jpg` |
| 6 | HPE Aruba OS-CX Service and Solution Qualification | HPE | 23 Feb 2025 | — | `hpe-aruba-os-cx.jpg` |
| 7 | HPE Modular Storage Arrays (MSA) Service and Solution Qualification | HPE | 17 Jun 2025 | — | `hpe-msa.jpg` |
| 8 | Storage Foundation Test | HPE | 17 Jun 2025 | — | `hpe-storage-foundation-test.jpg` |
| 9 | HPE Alletra 4000 Service and Solution Qualification | HPE | 13 Jul 2025 | — | `hpe-alletra-4000.jpg` |
| 10 | HPE StoreEver ESL Gen3 Tape Libraries Service and Solution Qualification | HPE | 21 Sep 2025 | — | `hpe-storeever-esl-gen3.jpg` |
| 11 | HPE StoreEver MSL Tape Libraries and 1/8 Autoloader Service and Solution Qualification | HPE | 27 Aug 2025 | — | `hpe-storeever-msl-autoloader.jpg` |
| 12 | HPE StoreFabric M-Series Ethernet iSCSI Switches Service and Solution Qualification | HPE | 25 Aug 2025 | — | `hpe-storefabric-m-series.jpg` |
| 13 | HPE 3PAR Service Processor 5.0.7 | HPE | 17 Jun 2025 | 0001131983 | `hpe-3par-service-processor.jpg` |

## Excluded on purpose

| File | Reason |
|---|---|
| `Huawei/1763874889933-….png` | xFusion FCIA certificate issued to **Elias Ahammmed**, not Kazi Atiqur Rahman. Publishing another person's credential would be inaccurate and a privacy problem. |

## Duplicate source files

The upload contained two sets of HPE PDFs — one batch dated Feb 2026 (root folder) and an earlier batch in `HPE Certificates/` (June 2025). Both sets describe the same qualifications; the site uses one canonical preview per certificate. No content is lost: the originals of the used set are in `files/`.

## Replacing or adding a certificate

1. Put the preview image at `public/assets/certifications/<slug>.jpg` (1400 px wide, 4:3, < 200 KB).
2. Put the source document at `public/assets/certifications/files/<slug>.pdf` (or `.jpg`).
3. Add or edit the entry in `src/data/portfolio.js` → `certifications`:

```js
{
  id: 'new-certificate',
  name: 'Full certificate title as printed',
  short: 'Card title',
  issuer: 'Vendor',
  vendor: 'HPE' | 'Huawei' | 'xFusion' | 'Other',
  dateLabel: '04 Feb 2025',        // omit if unknown
  validThrough: '08 Aug 2028',     // optional
  credentialId: '…',               // only if printed on the certificate
  image: 'new-certificate.jpg',
  file: 'files/new-certificate.pdf',
  featured: false,                  // true → large vendor card
  note: 'One line of context'
}
```

4. Rebuild and push. Cards, counts and the viewer update automatically.

> Only publish documents that belong to the portfolio owner, and never invent credential numbers.
