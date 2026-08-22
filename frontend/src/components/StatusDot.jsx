export default function StatusDot({ variant = 'primary', pulse = false }) {
  const cls = ['status-dot'];
  if (pulse) cls.push('pulse');
  if (variant === 'success') cls.push('success');
  if (variant === 'warning') cls.push('warning');
  if (variant === 'danger') cls.push('danger');
  if (variant === 'accent') cls.push('accent');
  return <span className={cls.join(' ')} aria-hidden="true" />;
}
