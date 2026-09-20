import { CustomerFeedback } from '../types';

/**
 * Exports feedback list to CSV file with UTF-8 BOM for full Arabic character support in Microsoft Excel
 */
export const exportFeedbackToCSV = (feedbacks: CustomerFeedback[], filenamePrefix = 'panda_feedback') => {
  if (!feedbacks || feedbacks.length === 0) {
    return false;
  }

  const headers = [
    'المعرف',
    'التاريخ والوقت',
    'اسم العميل',
    'رقم الجوال',
    'اللغة المختارة',
    'القسم الذي اختاره',
    'المنتجات المختارة',
    'التقييم',
    'نقاط تحدي بنده',
    'مستوى الصعوبة',
    'الملاحظات'
  ];

  const escapeCSV = (value: string | number | undefined | null) => {
    if (value === undefined || value === null) return '""';
    const stringValue = String(value).replace(/"/g, '""');
    return `"${stringValue}"`;
  };

  const rows = feedbacks.map(f => [
    escapeCSV(f.id),
    escapeCSV(f.timestamp),
    escapeCSV(f.customerName || 'عميل بنده'),
    escapeCSV(f.customerPhone || 'غير مسجل'),
    escapeCSV(f.languageName || (f.languageCode === 'en' ? 'English' : 'العربية')),
    escapeCSV(f.section || f.preference || 'عام'),
    escapeCSV(f.selectedProducts.join(', ')),
    escapeCSV(f.ratingLabel || f.rating),
    escapeCSV(f.score),
    escapeCSV(f.difficulty === 'easy' ? 'سهل' : f.difficulty === 'medium' ? 'متوسط' : 'محترف'),
    escapeCSV(f.comment || 'لا توجد ملاحظات إضافية')
  ]);

  // Prepend UTF-8 BOM (\uFEFF) for Arabic encoding in Excel
  const csvContent = '\uFEFF' + [
    headers.map(escapeCSV).join(','),
    ...rows.map(row => row.join(','))
  ].join('\r\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  const dateStr = new Date().toISOString().slice(0, 10);
  link.setAttribute('href', url);
  link.setAttribute('download', `${filenamePrefix}_${dateStr}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  return true;
};

/**
 * Exports feedback list to JSON file
 */
export const exportFeedbackToJSON = (feedbacks: CustomerFeedback[], filenamePrefix = 'panda_feedback') => {
  if (!feedbacks || feedbacks.length === 0) {
    return false;
  }

  const jsonString = JSON.stringify(feedbacks, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  const dateStr = new Date().toISOString().slice(0, 10);
  link.setAttribute('href', url);
  link.setAttribute('download', `${filenamePrefix}_${dateStr}.json`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  return true;
};

/**
 * Copies a readable summary of customer feedback to clipboard
 */
export const copyFeedbackSummary = async (feedbacks: CustomerFeedback[]): Promise<boolean> => {
  if (!feedbacks || feedbacks.length === 0) return false;

  const total = feedbacks.length;
  const satisfiedCount = feedbacks.filter(f => f.rating === 'great' || f.rating === 'good').length;
  const satisfactionRate = Math.round((satisfiedCount / total) * 100);

  const summaryText = `📊 تقرير آراء وانطباعات عملاء بنده (${new Date().toLocaleDateString('ar-SA')}):
• إجمالي الردود المستلمة: ${total} عميل
• نسبة الرضا الإيجابي: ${satisfactionRate}%
• أعلى التقييمات: ${feedbacks.filter(f => f.rating === 'great').length} (رائع جداً)
• متوسط نقاط لعبة تحدي بنده: ${Math.round(feedbacks.reduce((acc, curr) => acc + (curr.score || 0), 0) / total)} نقطة

أحدث الردود:
${feedbacks.slice(0, 5).map(f => `- ${f.customerName || 'عميل'}: [${f.ratingLabel}] منتجات: (${f.selectedProducts.slice(0, 2).join(', ')})`).join('\n')}
`;

  try {
    await navigator.clipboard.writeText(summaryText);
    return true;
  } catch {
    return false;
  }
};
