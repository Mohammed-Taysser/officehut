import { Handwriting, MarginNote, Notebook } from 'officehut/react';

export default function Rtl() {
  return (
    <div dir='rtl' lang='ar'>
      <Notebook holes style={{ maxWidth: 560 }}>
        <h2>
          <MarginNote>٣.</MarginNote>
          محضر اجتماع المرافق
        </h2>
        <p>تُستبدل طابعة الطابق الثالث يوم الخميس.</p>
        <p className='notebook-check'>
          تم تجديد تصاريح المواقف للربع الرابع{' '}
          <span className='visually-hidden'>(تم)</span>
        </p>
        <p>
          يبدأ جدول المطبخ الأسبوع القادم{' '}
          <Handwriting className='text-danger'>— اسأل عمر</Handwriting>
        </p>
      </Notebook>
    </div>
  );
}
