interface IconProps {
  name: string;
  className?: string;
  size?: number;
}

const fontAwesomeIcons: Record<string, string> = {
  users: "fas fa-users",
  dice: "fas fa-dice",
  key: "fas fa-key",
  "info-circle": "fas fa-info-circle",
  code: "fas fa-code",
  database: "fas fa-database",
  "user-plus": "fas fa-user-plus",
  rocket: "fas fa-rocket",
  "folder-open": "fas fa-folder-open",
  star: "fas fa-star",
  "code-branch": "fas fa-code-branch",
  "calendar-alt": "fas fa-calendar-alt",
  keyboard: "fas fa-keyboard",
  bullseye: "fas fa-bullseye",
  "user-friends": "fas fa-user-friends",
  language: "fa fa-language",
};

export function Icon({ name, className = "", size = 16 }: IconProps) {
  const iconClass = fontAwesomeIcons[name];

  if (!iconClass) {
    return <span className={className}>?</span>;
  }

  return (
    <i className={`${iconClass} ${className}`} style={{ fontSize: size }} />
  );
}
