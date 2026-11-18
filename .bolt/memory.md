# Project memory

## Product intent & audience

- Fraud detection web app that runs ML inference entirely in-browser (no backend server)
- Users input transaction details and receive an instant fraud probability score
- Target audience: analysts/users testing transaction fraud risk with privacy (data never leaves device)

## Brand personality & voice

- Professional, trustworthy, security-oriented
- Plain-language risk assessments alongside model output
- Transparent about model limitations

## Visual design & UX direction

- Dark blue/teal color theme
- Smooth animations throughout
- Fully responsive (mobile + desktop)
- Form with labeled inputs, validation, helpful hints, and a progress bar showing completion
- "Random Fill" button for quick testing with sample data
- Animated analysis state during model evaluation
- Color-coded result panel: Low, Moderate, High, Very High risk levels
- Probability gauge, plain-language assessment, recommended action, and input summary
- Info section explaining how the model works

## Decisions, constraints & rationale

- Vite project setup
- Model retrained from dataset (original model file was corrupted/incompatible)
- Gradient Boosting classifier chosen after testing logistic regression baseline
- Model exported as lightweight JSON to `src/` for browser execution
- Dataset: 46,065 transactions with 5 features (amount, time, previous fraud count, account age, transactions in last 24 hours)
- Known limitation: features have near-zero correlation with fraud (all < 0.012; AUC ~0.52) — weak predictive signal inherent in the data
- Richer features (transaction type, device, payment method, location) could improve accuracy

## Open questions & assumptions

- User may have access to richer features not present in current dataset; if provided, model retraining would improve accuracy
- GitHub backend link was the original source; model was retrained locally due to corrupted/incompatible file
- Deployment target (static hosting vs. embedded) not yet specified