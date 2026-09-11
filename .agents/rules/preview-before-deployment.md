# Preview Before Deployment Rule

> [!IMPORTANT]
> **ALWAYS PREVIEW BEFORE DEPLOYING**: Before any deployment or go-live action, a local preview server must be launched and verified.

## Mandatory Procedure

1. **Build & Verify Locally**:
   - Launch a local HTTP preview server (e.g. `http://localhost:8085`).
   - Validate that all HTML pages, CSS styles, JavaScript assets, forms, and navigation links load cleanly with zero broken paths.
2. **Present Preview URL to User**:
   - Provide the exact local preview link and page routes to the user for visual and functional verification.
3. **Confirm Explicit Deployment Approval**:
   - Obtain user approval before executing any remote deployment or production publication commands (e.g. `firebase deploy`, `vercel --prod`, GitHub Pages push).
