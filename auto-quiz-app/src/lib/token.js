import { prisma } from './prisma';

export async function getTokenByEmail(email) {
  try {
    return prisma.token.findFirst({
      where: { email },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getTokenByToken(token) {
  try {
    return prisma.token.findFirst({
      where: { token },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function generateToken(email) {
  const token = getToken();
  const expires = new Date(Date.now() + 1000 * 60 * 60 * 24); //  Expires in 24 hours

  const existingToken = await getTokenByEmail(email);

  if (existingToken) {
    await prisma.token.delete({
      where: { id: existingToken.id },
    });
  }

  return prisma.token.create({
    data: {
      email,
      token,
      expires,
    },
  });
}

function getToken() {
  const arrayBuffer = new Uint8Array(48);
  crypto.getRandomValues(arrayBuffer);
  return Array.from(arrayBuffer, (byte) =>
    byte.toString(16).padStart(2, '0'),
  ).join('');
}
