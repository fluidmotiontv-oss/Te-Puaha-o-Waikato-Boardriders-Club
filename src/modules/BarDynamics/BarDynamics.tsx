import React, { useState } from 'react';
import { initialSurfReport } from '../../data/clubData';
import { LiveReportTab } from '../../components/Tabs/LiveReportTab';

export function BarDynamics() {
  const [report, setReport] = useState(initialSurfReport);
  return <LiveReportTab lang="reo" report={report} setReport={setReport} />;
}
