// src/models/Job.js
const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({ 
    
  title: { type: String, 
    required: true },

  description: { type: String },

  budget: { type: Number, 
    required: true },

  clientId: { type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' },

  createdAt: { type: Date, 
    default: Date.now },
});

module.exports = mongoose.model('Job', jobSchema);
