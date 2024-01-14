import React, { useEffect, useState, type ReactNode } from "react";

interface WithIsClientProps {
  children?: ReactNode;
}

const withIsClient = (WrappedComponent: React.FC<WithIsClientProps>) => {
  const WithIsClient: React.FC<WithIsClientProps> = ({ children, ...rest }) => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
      setIsClient(true);
    }, []);

    return isClient ? (
      <WrappedComponent {...rest}>{children}</WrappedComponent>
    ) : null;
  };

  WithIsClient.displayName = `withIsClient(${getDisplayName(
    WrappedComponent
  )})`;

  return WithIsClient;
};

const getDisplayName = (WrappedComponent: React.FC<WithIsClientProps>) => {
  return WrappedComponent.displayName || WrappedComponent.name || "Component";
};

export default withIsClient;
