interface ErrorMessageProps {
  message?: string;
  className?: string;
}

const ErrorMessage = ({ message, className = "" }: ErrorMessageProps) => {
  if (!message) return null;

  return (
    <span className={`text-red-600 dark:text-red-400 text-sm ${className}`}>
      {message}
    </span>
  );
};

export default ErrorMessage;
