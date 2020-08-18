import DatePickerItem from '@/components/form-item/date-picker';
import MonthDatePickerItem from '@/components/form-item/date-picker/month';
import QuarterDatePickerItem from '@/components/form-item/date-picker/quarter';
import WeekDatePickerItem from '@/components/form-item/date-picker/week';
import YearDatePickerItem from '@/components/form-item/date-picker/year';
import { Card } from 'antd';
import React from 'react';

const DatePickerWidget = () => {
  return (
    <Card title="日期选择">
      <DatePickerItem field="datePicker" label="基本" />
      <YearDatePickerItem field="year" label="年" />
      <QuarterDatePickerItem field="quarter" label="季度" />
      <MonthDatePickerItem field="month" label="月份" />
      <WeekDatePickerItem field="week" label="周" />
    </Card>
  );
};

export default DatePickerWidget;
