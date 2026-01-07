interface HeaderProps {
  title: string;
  iconUrl?: string;
}

export function CompetitionHeader({ title, iconUrl }: HeaderProps) {
  return (
    <div className="competitionHeader">
      {iconUrl && <img src={iconUrl} alt={`${title} logo`} className="competitionIcon" />}
      <h1 className="title">{title}</h1>
    </div>
  );
}
