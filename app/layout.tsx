import './globals.css'; 

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body className='relative h-screen bg-slate-200 max-h-full'>
        {children}
      </body>
    </html>
  );
}
