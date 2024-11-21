import { createCanvas } from '@josefabio/deno-canvas';


export interface ICaptchaCreate {
  width?: number;
  height?: number;
  length?: number;
  dictionary?: string;
  skew?: number;
}

export function createCaptcha(params: ICaptchaCreate) {

  const dictionary = params.dictionary ?? '0123456789';
  let text = '';

  for (let i = 0; i < (params.length ?? 6); i++) {
    text += dictionary.charAt(Math.floor(Math.random() * dictionary.length));
  }

  const canvas = createCanvas(params.width ?? 200, params.height ?? 52);
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, canvas.width, canvas.height);


  for (let i = 0; i < 400; i++) {

    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;

    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    const a = Math.random() * 0.6 + 0.4;

    ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`;

    ctx.beginPath();
    ctx.arc(x, y, Math.random() * 3, 0, 3 * Math.PI);
    ctx.fill();

  }

  ctx.font = 'bold 30px Arial';
  ctx.fillStyle = 'black';

  for (let i = 0; i < text.length; i++) {

    const fontSize = Math.floor(Math.random() * 16) + 24;
    ctx.font = `bold ${fontSize}px Arial`;

    const rotation = (Math.random() - 0.5) * 60 * Math.PI / 180;

    const x = 20 + i * 30;
    const y = canvas.height / 2 + fontSize / 3;

    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);

    ctx.fillText(text[i], 0, 0);

    ctx.restore();

  }

  for (let i = 0; i < 9; i++) {

    const sx = Math.random() * canvas.width;
    const ex = Math.random() * canvas.width;

    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    const a = 1;
    const lineWidth = Math.random() * 2 + 1;

    ctx.beginPath();
    ctx.moveTo(sx, 0);
    ctx.lineTo(ex, canvas.height);
    ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
    ctx.lineWidth = lineWidth;
    ctx.stroke();

  }

  return {
    text: text,
    data: canvas.toDataURL('image/png'),
  };

}
