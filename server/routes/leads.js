import express from 'express';

const router = express.Router();

// Validation helper
const validateLead = (data) => {
  const errors = [];
  
  if (!data.name || data.name.trim().length < 2) {
    errors.push('Ім\'я повинно мати мінімум 2 символи');
  }
  
  const phoneRegex = /^\+?380\d{9}$/;
  if (!data.phone || !phoneRegex.test(data.phone.replace(/\D/g, ''))) {
    errors.push('Невірний номер телефону');
  }
  
  if (!data.service) {
    errors.push('Будь ласка, виберіть послугу');
  }
  
  return errors;
};

// POST /api/leads
router.post('/', (req, res) => {
  const { name, phone, service, comment } = req.body;
  
  const errors = validateLead({ name, phone, service });
  
  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      errors
    });
  }
  
  // TODO: Send to database or email service
  console.log('📝 New Lead:', { name, phone, service, comment });
  
  res.status(200).json({
    success: true,
    message: 'Дякуємо! Вашу заявку прийнято. Ми зв\'яжемося з вами найближчим часом.'
  });
});

export default router;