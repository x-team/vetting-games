interface JWT_Payload {
  id: string;
  email: string;
  name: string;
  iat: number;
  exp: number;
}

export default function getJWTPayload(token: string): JWT_Payload {
  const [, payload] = token.split(".");
  return JSON.parse(window.atob(payload)) as JWT_Payload;
}
