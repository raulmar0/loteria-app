interface Props {
  checked: boolean;
  onChange: (next: boolean) => void;
  onColor: string;
  label: string;
}

export function Switch({ checked, onChange, onColor, label }: Props) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      className={`switch ${checked ? 'on' : ''}`}
      style={{ background: checked ? onColor : '#ccc' }}
      onClick={() => onChange(!checked)}
    >
      <span className="switch-thumb" />
    </button>
  );
}
