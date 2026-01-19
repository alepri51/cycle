import React, { useState, useMemo } from 'react';

const CycleInfographic = () => {
  const [cycleStartDate, setCycleStartDate] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [calendarMonth, setCalendarMonth] = useState(new Date());

  const weeks = [
    {
      id: 1,
      name: 'После месячных',
      days: '1-7',
      dayRange: [1, 7],
      emoji: '✨',
      color: '#7ED7C1',
      bgGradient: 'linear-gradient(135deg, #7ED7C1 0%, #A8E6CF 100%)',
      mood: 'Энергия на максимуме',
      moodLevel: 95,
      energy: 95,
      irritability: 15,
      physical: 90,
      icon: '🦋',
      highlights: [
        'Много энергии и вдохновения',
        'Готова свернуть горы',
        'Вода ушла из организма',
        'Отличное настроение'
      ],
      warnings: [
        'Не давить психологически',
        'Острая реакция на давление'
      ],
      tips: 'Идеальное время для активных планов и важных решений',
      bodyFeel: 'Лёгкость'
    },
    {
      id: 2,
      name: 'Овуляция',
      days: '8-14',
      dayRange: [8, 14],
      emoji: '🌸',
      color: '#FFB4B4',
      bgGradient: 'linear-gradient(135deg, #FFB4B4 0%, #FFDDD2 100%)',
      mood: 'Нестабильное',
      moodLevel: 40,
      energy: 60,
      irritability: 70,
      physical: 75,
      icon: '🔥',
      highlights: [
        'Самочувствие в норме',
        'Раньше был подъём энергии'
      ],
      warnings: [
        'Последний год — агрессия',
        'Либидо на нуле',
        'Может тянуть яичник'
      ],
      tips: 'Период требует терпения и понимания',
      bodyFeel: 'Норма'
    },
    {
      id: 3,
      name: 'ПМС',
      days: '15-21',
      dayRange: [15, 21],
      emoji: '🌊',
      color: '#B4B4FF',
      bgGradient: 'linear-gradient(135deg, #B4B4FF 0%, #DDD2FF 100%)',
      mood: 'Агрессия на пике',
      moodLevel: 15,
      energy: 30,
      irritability: 95,
      physical: 20,
      icon: '💧',
      highlights: [
        'Если всё по плану — сглаживается'
      ],
      warnings: [
        'Сильные отёки всего тела',
        'Живот раздут как шарик',
        'Набор веса из-за воды',
        'Раздражение из-за мелочей',
        'Сложно остановиться'
      ],
      tips: 'Не провоцировать, избегать конфликтов',
      bodyFeel: 'Шрек-режим'
    },
    {
      id: 4,
      name: 'Месячные',
      days: '22-28',
      dayRange: [22, 28],
      emoji: '🌙',
      color: '#FFD9B4',
      bgGradient: 'linear-gradient(135deg, #FFD9B4 0%, #FFE8D2 100%)',
      mood: 'Слезливость',
      moodLevel: 50,
      energy: 35,
      irritability: 10,
      physical: 30,
      icon: '🤗',
      highlights: [
        'Агрессии нет совсем',
        'Тактильность на пике',
        'С 4-го дня — улучшение'
      ],
      warnings: [
        'Сильно ноет низ живота (дни 1-3)',
        'Ощущение распирания',
        'Тяжело много ходить'
      ],
      tips: 'Плед, чай, фильм, объятия и тишина',
      bodyFeel: 'Нужны обнимашки'
    }
  ];

  // Вычисляем текущий день цикла и активную фазу
  const { currentDay, activeWeekId } = useMemo(() => {
    if (!cycleStartDate) return { currentDay: null, activeWeekId: null };
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const start = new Date(cycleStartDate);
    start.setHours(0, 0, 0, 0);
    
    const diffTime = today - start;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
    
    // Цикл 28 дней, зацикливаем
    const dayInCycle = ((diffDays - 1) % 28) + 1;
    
    // Находим фазу
    const week = weeks.find(w => dayInCycle >= w.dayRange[0] && dayInCycle <= w.dayRange[1]);
    
    return { currentDay: dayInCycle, activeWeekId: week?.id || null };
  }, [cycleStartDate]);

  // Генерация дней календаря
  const calendarDays = useMemo(() => {
    const year = calendarMonth.getFullYear();
    const month = calendarMonth.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    
    // День недели первого числа (0 = воскресенье, переводим в пн = 0)
    let startDayOfWeek = firstDay.getDay() - 1;
    if (startDayOfWeek < 0) startDayOfWeek = 6;
    
    const days = [];
    
    // Пустые ячейки до первого дня
    for (let i = 0; i < startDayOfWeek; i++) {
      days.push({ day: null, date: null });
    }
    
    // Дни месяца
    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(year, month, d);
      days.push({ day: d, date });
    }
    
    return days;
  }, [calendarMonth]);

  const monthNames = [
    'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
    'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
  ];

  const dayNames = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

  const handleDateSelect = (date) => {
    if (date && date <= new Date()) {
      setCycleStartDate(date);
      setShowCalendar(false);
    }
  };

  const prevMonth = () => {
    setCalendarMonth(new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCalendarMonth(new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() + 1, 1));
  };

  const isToday = (date) => {
    if (!date) return false;
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSelected = (date) => {
    if (!date || !cycleStartDate) return false;
    return date.toDateString() === cycleStartDate.toDateString();
  };

  const isFuture = (date) => {
    if (!date) return false;
    const today = new Date();
    today.setHours(23, 59, 59, 999);
    return date > today;
  };

  const ProgressBar = ({ value, color, label }) => (
    <div style={{ marginBottom: '8px' }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        fontSize: '11px',
        marginBottom: '4px',
        color: '#666',
        fontFamily: "'Nunito', sans-serif"
      }}>
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div style={{ 
        height: '8px', 
        background: '#E8E8E8', 
        borderRadius: '4px',
        overflow: 'hidden'
      }}>
        <div style={{ 
          width: `${value}%`, 
          height: '100%', 
          background: color,
          borderRadius: '4px',
          transition: 'width 0.5s ease'
        }} />
      </div>
    </div>
  );

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #FFF9F5 0%, #FFF5F8 50%, #F5F8FF 100%)',
      padding: '40px 20px',
      fontFamily: "'Nunito', sans-serif"
    }}>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&family=Playfair+Display:wght@600;700&display=swap');
          
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
          
          @keyframes pulse {
            0%, 100% { box-shadow: 0 0 0 0 rgba(126, 215, 193, 0.4); }
            50% { box-shadow: 0 0 0 15px rgba(126, 215, 193, 0); }
          }
          
          @keyframes glow {
            0%, 100% { box-shadow: 0 0 20px rgba(126, 215, 193, 0.3); }
            50% { box-shadow: 0 0 40px rgba(126, 215, 193, 0.6); }
          }
        `}
      </style>

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <div style={{ 
          fontSize: '48px', 
          marginBottom: '15px',
          animation: 'float 3s ease-in-out infinite'
        }}>
          🌺
        </div>
        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: '36px',
          fontWeight: '700',
          color: '#2D2D2D',
          margin: '0 0 10px 0',
          letterSpacing: '-0.5px'
        }}>
          Мой Цикл
        </h1>
        <p style={{
          color: '#888',
          fontSize: '16px',
          margin: 0,
          fontWeight: '400'
        }}>
          Персональный гид по 28 дням
        </p>
      </div>

      {/* Calendar Picker */}
      <div style={{
        maxWidth: '400px',
        margin: '0 auto 40px',
        position: 'relative'
      }}>
        <div 
          onClick={() => setShowCalendar(!showCalendar)}
          style={{
            background: '#FFFFFF',
            borderRadius: '16px',
            padding: '16px 20px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            border: '2px solid transparent',
            transition: 'all 0.3s ease',
            ':hover': { borderColor: '#7ED7C1' }
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '24px' }}>📅</span>
            <div>
              <div style={{ fontSize: '12px', color: '#888', marginBottom: '2px' }}>
                Начало цикла
              </div>
              <div style={{ fontSize: '16px', fontWeight: '700', color: '#2D2D2D' }}>
                {cycleStartDate 
                  ? cycleStartDate.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })
                  : 'Выбери дату начала месячных'
                }
              </div>
            </div>
          </div>
          <span style={{ 
            fontSize: '20px',
            transform: showCalendar ? 'rotate(180deg)' : 'rotate(0)',
            transition: 'transform 0.3s ease'
          }}>
            ▼
          </span>
        </div>

        {/* Calendar Dropdown */}
        {showCalendar && (
          <div style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            marginTop: '8px',
            background: '#FFFFFF',
            borderRadius: '16px',
            padding: '20px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
            zIndex: 100
          }}>
            {/* Month Navigation */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '16px'
            }}>
              <button 
                onClick={prevMonth}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '20px',
                  cursor: 'pointer',
                  padding: '8px',
                  borderRadius: '8px',
                  transition: 'background 0.2s'
                }}
              >
                ←
              </button>
              <span style={{ fontWeight: '700', fontSize: '16px', color: '#2D2D2D' }}>
                {monthNames[calendarMonth.getMonth()]} {calendarMonth.getFullYear()}
              </span>
              <button 
                onClick={nextMonth}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '20px',
                  cursor: 'pointer',
                  padding: '8px',
                  borderRadius: '8px',
                  transition: 'background 0.2s'
                }}
              >
                →
              </button>
            </div>

            {/* Day Names */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(7, 1fr)',
              gap: '4px',
              marginBottom: '8px'
            }}>
              {dayNames.map(day => (
                <div key={day} style={{
                  textAlign: 'center',
                  fontSize: '12px',
                  fontWeight: '600',
                  color: '#888',
                  padding: '8px 0'
                }}>
                  {day}
                </div>
              ))}
            </div>

            {/* Days Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(7, 1fr)',
              gap: '4px'
            }}>
              {calendarDays.map((item, index) => (
                <div
                  key={index}
                  onClick={() => !isFuture(item.date) && handleDateSelect(item.date)}
                  style={{
                    aspectRatio: '1',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '10px',
                    fontSize: '14px',
                    fontWeight: isToday(item.date) ? '700' : '500',
                    cursor: item.day && !isFuture(item.date) ? 'pointer' : 'default',
                    background: isSelected(item.date) 
                      ? 'linear-gradient(135deg, #FF8B8B 0%, #FFB4B4 100%)'
                      : isToday(item.date)
                        ? '#F0F0F0'
                        : 'transparent',
                    color: isSelected(item.date) 
                      ? '#FFF' 
                      : isFuture(item.date) 
                        ? '#CCC' 
                        : '#2D2D2D',
                    transition: 'all 0.2s ease',
                    border: isToday(item.date) && !isSelected(item.date) ? '2px solid #7ED7C1' : '2px solid transparent'
                  }}
                >
                  {item.day}
                </div>
              ))}
            </div>

            {/* Hint */}
            <div style={{
              marginTop: '16px',
              padding: '12px',
              background: '#FFF5F5',
              borderRadius: '10px',
              fontSize: '12px',
              color: '#888',
              textAlign: 'center'
            }}>
              💡 Выбери первый день последних месячных
            </div>
          </div>
        )}
      </div>

      {/* Current Status Banner */}
      {cycleStartDate && (
        <div style={{
          maxWidth: '500px',
          margin: '0 auto 40px',
          background: weeks.find(w => w.id === activeWeekId)?.bgGradient || '#FFF',
          borderRadius: '20px',
          padding: '24px',
          textAlign: 'center',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
          animation: 'glow 2s ease-in-out infinite'
        }}>
          <div style={{ fontSize: '40px', marginBottom: '12px' }}>
            {weeks.find(w => w.id === activeWeekId)?.emoji}
          </div>
          <div style={{ fontSize: '14px', color: '#666', marginBottom: '4px' }}>
            Сейчас
          </div>
          <div style={{ 
            fontSize: '28px', 
            fontWeight: '800', 
            color: '#2D2D2D',
            marginBottom: '8px',
            fontFamily: "'Playfair Display', serif"
          }}>
            День {currentDay} — {weeks.find(w => w.id === activeWeekId)?.name}
          </div>
          <div style={{ fontSize: '14px', color: '#555' }}>
            {weeks.find(w => w.id === activeWeekId)?.tips}
          </div>
        </div>
      )}

      {/* Circular Timeline */}
      <div style={{
        position: 'relative',
        width: '320px',
        height: '320px',
        margin: '0 auto 50px',
      }}>
        <svg viewBox="0 0 320 320" style={{ width: '100%', height: '100%' }}>
          {weeks.map((week, index) => {
            const startAngle = (index * 90 - 90) * (Math.PI / 180);
            const endAngle = ((index + 1) * 90 - 90) * (Math.PI / 180);
            const radius = 130;
            const centerX = 160;
            const centerY = 160;
            
            const x1 = centerX + radius * Math.cos(startAngle);
            const y1 = centerY + radius * Math.sin(startAngle);
            const x2 = centerX + radius * Math.cos(endAngle);
            const y2 = centerY + radius * Math.sin(endAngle);
            
            const midAngle = (startAngle + endAngle) / 2;
            const labelRadius = 85;
            const labelX = centerX + labelRadius * Math.cos(midAngle);
            const labelY = centerY + labelRadius * Math.sin(midAngle);
            
            const isActive = activeWeekId === week.id;
            
            return (
              <g key={week.id}>
                <path
                  d={`M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 0 1 ${x2} ${y2} Z`}
                  fill={isActive ? week.color : `${week.color}66`}
                  stroke={isActive ? week.color : '#fff'}
                  strokeWidth={isActive ? '4' : '3'}
                  style={{ 
                    transition: 'all 0.4s ease',
                    filter: isActive ? 'drop-shadow(0 4px 15px rgba(0,0,0,0.2))' : 'none'
                  }}
                />
                <text
                  x={labelX}
                  y={labelY - 8}
                  textAnchor="middle"
                  style={{
                    fontSize: '11px',
                    fontWeight: '700',
                    fill: '#2D2D2D',
                    pointerEvents: 'none',
                    fontFamily: "'Nunito', sans-serif"
                  }}
                >
                  {week.name}
                </text>
                <text
                  x={labelX}
                  y={labelY + 8}
                  textAnchor="middle"
                  style={{
                    fontSize: '10px',
                    fill: '#666',
                    pointerEvents: 'none',
                    fontFamily: "'Nunito', sans-serif"
                  }}
                >
                  дни {week.days}
                </text>
              </g>
            );
          })}
          <circle cx="160" cy="160" r="45" fill="#FFF9F5" />
          {cycleStartDate ? (
            <>
              <text x="160" y="155" textAnchor="middle" style={{ fontSize: '24px' }}>
                {weeks.find(w => w.id === activeWeekId)?.emoji}
              </text>
              <text x="160" y="175" textAnchor="middle" style={{ fontSize: '11px', fill: '#888', fontFamily: "'Nunito', sans-serif" }}>
                день {currentDay}
              </text>
            </>
          ) : (
            <>
              <text x="160" y="155" textAnchor="middle" style={{ fontSize: '12px', fill: '#888', fontFamily: "'Nunito', sans-serif" }}>
                выбери дату
              </text>
              <text x="160" y="172" textAnchor="middle" style={{ fontSize: '12px', fill: '#888', fontFamily: "'Nunito', sans-serif" }}>
                выше ↑
              </text>
            </>
          )}
        </svg>
      </div>

      {/* Detail Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '20px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {weeks.map((week) => {
          const isActive = activeWeekId === week.id;
          return (
            <div
              key={week.id}
              style={{
                background: isActive ? week.bgGradient : '#FFFFFF',
                borderRadius: '24px',
                padding: '24px',
                boxShadow: isActive 
                  ? '0 20px 40px rgba(0,0,0,0.15)' 
                  : '0 4px 20px rgba(0,0,0,0.06)',
                transition: 'all 0.4s ease',
                transform: isActive ? 'scale(1.03)' : 'scale(1)',
                border: isActive ? `3px solid ${week.color}` : '3px solid transparent',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* Active Badge */}
              {isActive && (
                <div style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  background: 'rgba(255,255,255,0.9)',
                  padding: '6px 12px',
                  borderRadius: '20px',
                  fontSize: '11px',
                  fontWeight: '700',
                  color: week.color,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}>
                  ✨ СЕЙЧАС
                </div>
              )}

              {/* Card Header */}
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '16px',
                  background: isActive ? 'rgba(255,255,255,0.5)' : week.bgGradient,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px',
                  marginRight: '14px'
                }}>
                  {week.emoji}
                </div>
                <div>
                  <h3 style={{
                    margin: 0,
                    fontSize: '18px',
                    fontWeight: '700',
                    color: '#2D2D2D'
                  }}>
                    {week.name}
                  </h3>
                  <span style={{
                    fontSize: '13px',
                    color: '#888',
                    fontWeight: '600'
                  }}>
                    Дни {week.days} • {week.bodyFeel}
                  </span>
                </div>
              </div>

              {/* Stats */}
              <div style={{ marginBottom: '16px' }}>
                <ProgressBar value={week.energy} color="#7ED7C1" label="⚡ Энергия" />
                <ProgressBar value={week.moodLevel} color="#FFB4B4" label="😊 Настроение" />
                <ProgressBar value={week.irritability} color="#FF8B8B" label="😤 Раздражительность" />
                <ProgressBar value={week.physical} color="#B4B4FF" label="💪 Физическое состояние" />
              </div>

              {/* Good Things */}
              <div style={{ marginBottom: '12px' }}>
                <div style={{ 
                  fontSize: '12px', 
                  fontWeight: '700', 
                  color: '#4CAF50',
                  marginBottom: '6px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  ✓ Плюсы
                </div>
                {week.highlights.map((item, i) => (
                  <div key={i} style={{
                    fontSize: '13px',
                    color: '#444',
                    padding: '4px 0',
                    paddingLeft: '12px',
                    borderLeft: `2px solid ${week.color}`
                  }}>
                    {item}
                  </div>
                ))}
              </div>

              {/* Warnings */}
              <div style={{ marginBottom: '16px' }}>
                <div style={{ 
                  fontSize: '12px', 
                  fontWeight: '700', 
                  color: '#FF6B6B',
                  marginBottom: '6px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  ⚠ Внимание
                </div>
                {week.warnings.map((item, i) => (
                  <div key={i} style={{
                    fontSize: '13px',
                    color: '#666',
                    padding: '4px 0',
                    paddingLeft: '12px',
                    borderLeft: '2px solid #FFB4B4'
                  }}>
                    {item}
                  </div>
                ))}
              </div>

              {/* Tip */}
              <div style={{
                background: 'rgba(255,255,255,0.7)',
                borderRadius: '12px',
                padding: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                <span style={{ fontSize: '20px' }}>{week.icon}</span>
                <span style={{ 
                  fontSize: '13px', 
                  color: '#555',
                  fontWeight: '600',
                  lineHeight: '1.4'
                }}>
                  {week.tips}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Reference */}
      <div style={{
        maxWidth: '800px',
        margin: '50px auto 0',
        background: '#FFFFFF',
        borderRadius: '24px',
        padding: '30px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.06)'
      }}>
        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: '24px',
          textAlign: 'center',
          marginBottom: '24px',
          color: '#2D2D2D'
        }}>
          🗝️ Краткая памятка
        </h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '16px'
        }}>
          {[
            { emoji: '✨', text: 'Неделя 1: Дай мне действовать!', sub: 'Не дави' },
            { emoji: '🌸', text: 'Неделя 2: Терпение', sub: 'Не провоцируй' },
            { emoji: '🌊', text: 'Неделя 3: Держи дистанцию', sub: 'Без конфликтов' },
            { emoji: '🌙', text: 'Неделя 4: Обними меня', sub: 'Плед и забота' }
          ].map((item, i) => (
            <div key={i} style={{
              background: activeWeekId === weeks[i].id ? weeks[i].bgGradient : `${weeks[i].color}33`,
              borderRadius: '16px',
              padding: '16px',
              textAlign: 'center',
              border: activeWeekId === weeks[i].id ? `2px solid ${weeks[i].color}` : '2px solid transparent',
              transition: 'all 0.3s ease'
            }}>
              <div style={{ fontSize: '32px', marginBottom: '8px' }}>{item.emoji}</div>
              <div style={{ fontSize: '14px', fontWeight: '700', color: '#2D2D2D', marginBottom: '4px' }}>
                {item.text}
              </div>
              <div style={{ fontSize: '12px', color: '#666' }}>{item.sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div style={{
        textAlign: 'center',
        marginTop: '40px',
        color: '#AAA',
        fontSize: '13px'
      }}>
        💕 Создано с любовью и пониманием
      </div>
    </div>
  );
};

export default CycleInfographic;

// Для совместимости
const App = CycleInfographic;
export { App };
