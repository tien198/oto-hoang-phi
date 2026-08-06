import sharp from 'sharp'

export async function generateBlurDataURL(
  sourceBuffer: Buffer,
  options?: {
    quality: number
    width?: number
    height?: number
  },
) {
  const quality = options?.quality ?? 80
  const width = options?.width ?? 30
  const height = options?.height ?? undefined
  try {
    const { data: buffer, info } = await sharp(sourceBuffer)
      .webp({ quality })
      .resize({ width, height })
      .toBuffer({ resolveWithObject: true })
    // .toFile(outputPath);
    const data = `data:image/${info.format};base64,${buffer.toString('base64')}`

    return data
    // console.log(data);
  } catch (error) {
    console.error('Error resizing images:', error)
    return ''
  }
}
