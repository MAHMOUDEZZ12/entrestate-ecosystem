
# To learn more about how to use Nix to configure your environment
# see: https://developers.google.com/idx/guides/customize-idx-env
{ pkgs, ... }: {
  # Which nixpkgs channel to use.
  channel = "stable-24.05"; # Using a stable channel is best practice for production

  # Use https://search.nixos.org/packages to find packages
  packages = [
    pkgs.nodejs_20  # Explicitly using Node.js 20
    pkgs.nodePackages.npm # Ensuring npm is available
    pkgs.chromium # For PDF generation with Puppeteer
    pkgs.firebase-tools # For Firebase deployment and management
  ];

  # Sets environment variables in the workspace
  env = {
    # It's better to use secrets for sensitive keys, but for stability:
    NEXT_PUBLIC_API_URL = "http://localhost:3000";
    # Add other necessary environment variables
  };

  idx = {
    # Essential extensions for a Next.js and Firebase project
    extensions = [
      "dbaeumer.vscode-eslint",
      "esbenp.prettier-vscode",
      "firebase.firebase-vscode",
      "google.gemini-cli-vscode-ide-companion"
    ];

    # Refined previews configuration
    previews = {
      enable = true;
      previews = {
        web = {
          command = ["npm", "run", "dev"];
          manager = "web";
        };
      };
    };

    # Workspace lifecycle hooks for a robust Next.js workflow
    workspace = {
      # Runs when a workspace is first created
      onCreate = {
        # Clean install for a pristine environment
        npm-install = "npm ci";
        # Open key files for immediate context
        default.openFiles = [
            ".idx/dev.nix",
            "package.json",
            "src/app/page.tsx",
            "src/app/me/ei-os/page.tsx"
        ];
      };
      # Runs when the workspace is (re)started
      onStart = {
        # The build command was likely the source of instability.
        # The 'npm run dev' command handles this in development.
        # We will rely on CI/CD for production builds.
      };
    };
  };
}
