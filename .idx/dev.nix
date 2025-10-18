
# To learn more about how to use Nix to configure your environment
# see: https://developers.google.com/idx/guides/customize-idx-env
{ pkgs, ... }: {
  # Which nixpkgs channel to use.
  channel = "stable-24.05";

  # Use https://search.nixos.org/packages to find packages
  packages = [
    pkgs.nodejs_20
    pkgs.nodePackages.npm
    pkgs.chromium
    pkgs.firebase-tools
  ];

  # Sets environment variables in the workspace
  env = {
    NEXT_PUBLIC_API_URL = "http://localhost:3000";
  };

  idx = {
    # Essential extensions for a Next.js and Firebase project
    extensions = [
      "dbaeumer.vscode-eslint",
      "esbenp.prettier-vscode",
      "firebase.firebase-vscode",
      "google.gemini-cli-vscode-ide-companion"
    ];

    # Corrected previews configuration to use the dynamic $PORT
    previews = {
      enable = true;
      previews = {
        web = {
          command = ["npm", "run", "dev", "--", "--port", "$PORT"];
          manager = "web";
        };
      };
    };

    # Workspace lifecycle hooks for a robust Next.js workflow
    workspace = {
      onCreate = {
        npm-install = "npm ci";
      };
      onStart = {};
    };
  };
}
