// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { s3Storage } from '@payloadcms/storage-s3'
import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import nodemailer from 'nodemailer'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import Services from './collections/Services'
import Events from './collections/Events'
import Newsletter from './collections/Newsletter'
import Programs from './collections/Programs'
import Gallery from './collections/Gallery'
const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Newsletter, Pages, Services, Events, Programs, Gallery],
  editor: lexicalEditor(),
  serverURL: process.env.NEXT_PUBLIC_PAYLOAD_URL,
  // serverURL: 'http://localhost:3000',
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  sharp,
  email: nodemailerAdapter({
    defaultFromAddress: `${process.env.EMAIL_USER}`,
    defaultFromName: 'Mayad World',
    transport: await nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    }),
  }),
  plugins: [
    s3Storage({
      collections: {
        media: {
          prefix: 'media',
        },
      },
      bucket: process.env.S3_BUCKET || '',
      config: {
        forcePathStyle: true,
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
        },
        region: process.env.S3_REGION,
        endpoint: process.env.S3_ENDPOINT,
      },
    }),
    formBuilderPlugin({
      fields: {
        text: true,
        textarea: true,
        email: true,
        number: true,
        payment: false,
      },
      redirectRelationships: ['pages'],
      defaultToEmail: 'devongeoffreymaina@gmail.com',
      formOverrides: {
        admin: {
          group: 'Forms',
        },
      },
      formSubmissionOverrides: {
        admin: {
          group: 'Forms',
        },
      },
    }),
  ],
})
