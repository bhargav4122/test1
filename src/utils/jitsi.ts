export const generateJitsiLink = (): string => {
  const roomId = `datasolutions-${Math.random().toString(36).substr(2, 8)}`;
  return `https://meet.jit.si/${roomId}`;
};
