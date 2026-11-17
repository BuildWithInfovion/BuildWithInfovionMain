// Generated from Cyvion's rule pack (backend/app/rules/*.yml): ATT&CK tactic -> techniques -> rules.
// Regenerate when rules change; see docs/internal/operations-guide.html.
export const CYVION_COVERAGE = [
 {
  "tactic": "reconnaissance",
  "cells": [
   {
    "id": "T1595",
    "name": "Active Scanning",
    "rules": [
     "Burst of WAF blocks from one address"
    ]
   },
   {
    "id": "T1190",
    "name": "Exploit Public-Facing Application",
    "rules": [
     "Burst of WAF blocks from one address"
    ]
   }
  ]
 },
 {
  "tactic": "initial_access",
  "cells": [
   {
    "id": "T1078.004",
    "name": "Valid Accounts: Cloud Accounts",
    "rules": [
     "AWS root account console sign-in",
     "Successful sign-in from Tor or an anonymising network",
     "Successful sign-in from an address reported for attacks",
     "Sign-in from a country this user has never signed in from",
     "Impossible travel between sign-ins"
    ]
   },
   {
    "id": "T1595",
    "name": "Active Scanning",
    "rules": [
     "Burst of WAF blocks from one address"
    ]
   },
   {
    "id": "T1190",
    "name": "Exploit Public-Facing Application",
    "rules": [
     "Burst of WAF blocks from one address"
    ]
   },
   {
    "id": "T1566.001",
    "name": "Spearphishing Attachment",
    "rules": [
     "Office application started a script or shell"
    ]
   },
   {
    "id": "T1204.002",
    "name": "User Execution: Malicious File",
    "rules": [
     "Office application started a script or shell"
    ]
   },
   {
    "id": "T1566.002",
    "name": "Spearphishing Link",
    "rules": [
     "Reported email is very likely phishing"
    ]
   },
   {
    "id": "T1566",
    "name": "Phishing",
    "rules": [
     "Reported email has phishing indicators"
    ]
   },
   {
    "id": "T1090.003",
    "name": "Multi-hop Proxy",
    "rules": [
     "Successful sign-in from Tor or an anonymising network"
    ]
   }
  ]
 },
 {
  "tactic": "execution",
  "cells": [
   {
    "id": "T1059.001",
    "name": "PowerShell",
    "rules": [
     "PowerShell started with an encoded command",
     "Suspicious PowerShell script block"
    ]
   },
   {
    "id": "T1566.001",
    "name": "Spearphishing Attachment",
    "rules": [
     "Office application started a script or shell"
    ]
   },
   {
    "id": "T1204.002",
    "name": "User Execution: Malicious File",
    "rules": [
     "Office application started a script or shell"
    ]
   },
   {
    "id": "T1003.008",
    "name": "/etc/passwd and /etc/shadow",
    "rules": [
     "Sensitive command run with sudo"
    ]
   },
   {
    "id": "T1059.004",
    "name": "Unix Shell",
    "rules": [
     "Sensitive command run with sudo"
    ]
   }
  ]
 },
 {
  "tactic": "persistence",
  "cells": [
   {
    "id": "T1098.001",
    "name": "Additional Cloud Credentials",
    "rules": [
     "AWS access key created",
     "Cloudflare API token created"
    ]
   },
   {
    "id": "T1098",
    "name": "Account Manipulation",
    "rules": [
     "Account added to a local or domain administrators group",
     "Account added to sudo, wheel or admin group on Linux"
    ]
   },
   {
    "id": "T1543.003",
    "name": "Windows Service",
    "rules": [
     "Service installed from a user-writable path or running a shell"
    ]
   },
   {
    "id": "T1053.005",
    "name": "Scheduled Task",
    "rules": [
     "Scheduled task runs a script or a file from a user folder"
    ]
   },
   {
    "id": "T1136",
    "name": "Create Account",
    "rules": [
     "Local user account created"
    ]
   },
   {
    "id": "T1136.001",
    "name": "Local Account",
    "rules": [
     "New local account created on a Linux host"
    ]
   }
  ]
 },
 {
  "tactic": "privilege_escalation",
  "cells": [
   {
    "id": "T1098",
    "name": "Account Manipulation",
    "rules": [
     "Account added to sudo, wheel or admin group on Linux"
    ]
   },
   {
    "id": "T1548.003",
    "name": "Sudo and Sudo Caching",
    "rules": [
     "Repeated sudo password failures"
    ]
   },
   {
    "id": "T1098.003",
    "name": "Additional Cloud Roles",
    "rules": [
     "Account added to a global or super admin role"
    ]
   }
  ]
 },
 {
  "tactic": "defense_evasion",
  "cells": [
   {
    "id": "T1562.008",
    "name": "Disable or Modify Cloud Logs",
    "rules": [
     "AWS CloudTrail logging stopped or deleted"
    ]
   },
   {
    "id": "T1562",
    "name": "Impair Defenses",
    "rules": [
     "GitHub branch protection removed"
    ]
   },
   {
    "id": "T1070.001",
    "name": "Clear Windows Event Logs",
    "rules": [
     "Windows Security event log cleared"
    ]
   },
   {
    "id": "T1556.006",
    "name": "Modify Authentication Process: MFA",
    "rules": [
     "Multi-factor authentication disabled for an account"
    ]
   }
  ]
 },
 {
  "tactic": "credential_access",
  "cells": [
   {
    "id": "T1552.001",
    "name": "Credentials In Files",
    "rules": [
     "Secret detected in a GitHub repository"
    ]
   },
   {
    "id": "T1003.001",
    "name": "LSASS Memory",
    "rules": [
     "LSASS memory accessed or dumped"
    ]
   },
   {
    "id": "T1003.008",
    "name": "/etc/passwd and /etc/shadow",
    "rules": [
     "Sensitive command run with sudo"
    ]
   },
   {
    "id": "T1059.004",
    "name": "Unix Shell",
    "rules": [
     "Sensitive command run with sudo"
    ]
   },
   {
    "id": "T1110",
    "name": "Brute Force",
    "rules": [
     "Password brute force from a single address"
    ]
   },
   {
    "id": "T1110.003",
    "name": "Password Spraying",
    "rules": [
     "Password spraying across many accounts"
    ]
   },
   {
    "id": "T1528",
    "name": "Steal Application Access Token",
    "rules": [
     "Third-party app granted access to mail or files"
    ]
   }
  ]
 },
 {
  "tactic": "collection",
  "cells": [
   {
    "id": "T1114.003",
    "name": "Email Forwarding Rule",
    "rules": [
     "Inbox rule forwards mail to an outside address"
    ]
   },
   {
    "id": "T1530",
    "name": "Data from Cloud Storage",
    "rules": [
     "Mass file download by one user",
     "S3 bucket made public"
    ]
   }
  ]
 },
 {
  "tactic": "command_and_control",
  "cells": [
   {
    "id": "T1105",
    "name": "Ingress Tool Transfer",
    "rules": [
     "Built-in Windows tool used to download a file"
    ]
   }
  ]
 },
 {
  "tactic": "exfiltration",
  "cells": [
   {
    "id": "T1567",
    "name": "Exfiltration Over Web Service",
    "rules": [
     "Spike in files shared outside the organisation"
    ]
   }
  ]
 },
 {
  "tactic": "impact",
  "cells": [
   {
    "id": "T1490",
    "name": "Inhibit System Recovery",
    "rules": [
     "Shadow copies or recovery options deleted"
    ]
   }
  ]
 }
];
export const CYVION_RULE_COUNT = 42;
