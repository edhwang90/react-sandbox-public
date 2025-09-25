import { CheckCircleIcon, FlagIcon, HourglassIcon, TagIcon, TargetIcon, TrendUpIcon } from '@phosphor-icons/react';
import type { TodoType } from '../../../../types/types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";

import './dashboard.scss';
import useDashboard from './useDashboard';

const Dashboard = ({ todos }: { todos: TodoType[] }) => {
  const {
    totalTasks,
    completedTasks,
    activeTasks,
    highPriorityActive,
    completionRate,
    recentTasks,
    topTags,
    tasksCompletedPerDay,
    avgCompletionTime,
    weeklyData
  } = useDashboard(todos);

  return (
    <div className="dashboard">
        {activeTasks === 0 && totalTasks > 0 && (
          <div className="attention">
            <div className="attention-header">
              🎉 All tasks complete! 
            </div>
              <div className="attention-subtext">
                Congratulations! You've completed all your tasks.
              </div>
          </div>
        )}

        {highPriorityActive > 0 && (
          <div className="attention attention-warning">
            <div className="attention-header">
              High priority tasks pending.
            </div>
              <div className="attention-subtext">
                You have {highPriorityActive} high priority task{highPriorityActive !== 1 ? 's' : ''} pending.
              </div>
          </div>
        )}

        <div className="row">
          <div className="col-6">
            <div className="card">
              <label><TargetIcon /> Total tasks</label>

              <div className="card-content">
                <span className="stat-value">{totalTasks}</span>
                <span className="stat-label">{recentTasks} added this week</span>
              </div>
            </div>  
          </div>
          <div className="col-6">
            <div className="card">
              <label><CheckCircleIcon />Completed tasks</label>

              <div className="card-content">
                <span className="stat-value">{completedTasks}</span>
                <span className="stat-label">{completionRate}% completion rate</span>
              </div>
            </div>  
          </div>
        </div>

        <div className="row">
          <div className="col-6">
            <div className="card">
              <label><TrendUpIcon /> Productivity</label>

              <div className="card-content">
                <span className="stat-value">{tasksCompletedPerDay.display}</span>
                <span className="stat-label">tasks completed per day</span>
              </div>
            </div>  
          </div>
          <div className="col-6">
            <div className="card">
              <label><HourglassIcon /> Average time to completion</label>

              <div className="card-content">
                <span className="stat-value">{avgCompletionTime.display}</span>
                <span className="stat-label">average time to complete</span>
              </div>
            </div>  
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <div className="card">
              <label>Overall progress</label>

              <div className="progress-bar">
                <div className="progress-bar-fill" style={{ width: `${completionRate}%` }}></div>
              </div>

              <div>
                {completionRate}% completed ({activeTasks} active)
              </div>
            </div>  
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <div className="card">
              <label>Productivity</label>
              <span className="stat-label">Tasks created and completed over the last 7 days</span>
              
               <div className="productivity-chart">
                 <ResponsiveContainer width="100%" height={300}>
                   <BarChart data={weeklyData} margin={{ top: 20, right: 0, left: 0, bottom: 5 }}>
                     <CartesianGrid strokeDasharray="3 3" />
                     <XAxis dataKey="day" />
                     <YAxis />
                     <Bar 
                       className="created-bars"
                       dataKey="created" 
                       name="Created"
                       radius={[4, 4, 0, 0]}
                     />
                     <Bar 
                       className="completed-bars"
                       dataKey="completed" 
                       name="Completed"
                       radius={[4, 4, 0, 0]}
                     />
                   </BarChart>
                 </ResponsiveContainer>
               </div>
               <div className="productivity-chart-legend">
                  <span className="legend-item"><span className="box created"></span> Created tasks</span>
                  <span className="legend-item"><span className="box completed"></span> Completed tasks</span>
               </div>
            </div>  
          </div>
        </div>

        <div className="row">
          <div className="col-6">
            <div className="card">
              <label><FlagIcon /> Priority breakdown</label>

              <ul className="dashboard-list">
                <li>
                  <div>
                    <span className="circle high-priority"></span> High Priority
                  </div>
                  <div className="priority-count">
                    <span className="count-badge">{todos.filter(todo => todo.priority === "high").length}</span>
                  </div>
                </li>
                <li>
                  <div>
                    <span className="circle medium-priority"></span> Medium Priority
                  </div>
                  <div className="priority-count">
                    <span className="count-badge">{todos.filter(todo => todo.priority === "medium").length}</span>
                  </div>
                </li>
                <li>
                  <div>
                    <span className="circle low-priority"></span> Low Priority
                  </div>
                  <div className="priority-count">
                    <span className="count-badge">{todos.filter(todo => todo.priority === "low").length}</span>
                  </div>
                </li>
              </ul>
            </div>  
          </div>
          <div className="col-6">
            <div className="card">
              <label><TagIcon /> Most used tags</label>

              {topTags.length > 0 && (
              <ul className="dashboard-list">
                {topTags.map(([tag, count], index) => (
                  <li key={index}>
                    <div>
                      {tag}
                    </div>
                    <div className="priority-count">
                      <span className="count-badge">{count}</span>
                    </div>
                  </li>
                ))}

              </ul>
              )}
              {topTags.length === 0 && (
                <div className="no-data">
                  No tags available
                </div>
              )}
            </div>  
          </div>
        </div>
    </div>
  )
}

export default Dashboard;