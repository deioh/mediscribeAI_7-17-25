export type GenerateNoteParams = {
  shorthand: string;
  mode: 'expand' | 'summarize';
};

export const generateNote = async (
  params: GenerateNoteParams,
  onStream: (chunk: string) => void
): Promise<void> => {
  const response = await fetch('/api/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });

  if (!response.ok) {
    throw new Error(`Server error: ${response.status} ${response.statusText}`);
  }

  if (!response.body) {
    throw new Error('Response body is null');
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let text = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      break;
    }
    text += decoder.decode(value, { stream: true });
    onStream(text);
  }
};
