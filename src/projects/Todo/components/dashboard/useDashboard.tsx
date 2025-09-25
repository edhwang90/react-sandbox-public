import type { TodoType } from '../../../../types/types';

const useDashboard = (todos: TodoType[]) => {
  // Statistics calculations
  const totalTasks = todos.length;
  const completedTasks = todos.filter(todo => todo.completed).length;
  const activeTasks = totalTasks - completedTasks;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  const highPriorityActive = todos.filter(todo => todo.priority === "high" && !todo.completed).length;

  // Recent activity (last 7 days)
  const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const recentTasks = todos.filter(todo => todo.createdAt >= oneWeekAgo).length;

  // Tag statistics
  const tagFrequency = todos.flatMap(todo => todo.tags).reduce((acc, tag) => {
    if (!tag) return acc;
    acc[tag] = (acc[tag] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const topTags = Object.entries(tagFrequency)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  // Productivity insights - tasks completed per day
  const getTasksCompletedPerDay = () => {
    const completedTasksWithTimestamp = todos.filter(todo => 
      todo.completed && todo.completedAt
    );

    if (completedTasksWithTimestamp.length === 0) {
      return { value: 0, display: '0' };
    }

    // Get the date range of completed tasks
    const completionDates = completedTasksWithTimestamp.map(todo => 
      new Date(todo.completedAt!)
    );
    
    const earliestCompletion = new Date(Math.min(...completionDates.map(d => d.getTime())));
    const latestCompletion = new Date(Math.max(...completionDates.map(d => d.getTime())));
    
    // Calculate the number of days between earliest and latest completion
    const timeDifference = latestCompletion.getTime() - earliestCompletion.getTime();
    const daysDifference = Math.max(1, Math.ceil(timeDifference / (1000 * 60 * 60 * 24)) + 1);
    
    // Calculate average tasks completed per day
    const averagePerDay = completedTasksWithTimestamp.length / daysDifference;
    
    return {
      value: averagePerDay,
      display: averagePerDay >= 1 
        ? Math.round(averagePerDay * 10) / 10 
        : Math.round(averagePerDay * 100) / 100
    };
  };

  const tasksCompletedPerDay = getTasksCompletedPerDay();

  // Average completion time calculation
  const getAverageCompletionTime = () => {
    const completedTasksWithTime = todos.filter(todo => 
      todo.completed && todo.completedAt && todo.createdAt
    );

    if (completedTasksWithTime.length === 0) {
      return { value: 0, unit: 'hours', display: 'No data' };
    }

    const totalCompletionTimeMs = completedTasksWithTime.reduce((sum, todo) => {
      const createdTime = new Date(todo.createdAt).getTime();
      const completedTime = new Date(todo.completedAt!).getTime();
      return sum + (completedTime - createdTime);
    }, 0);

    const averageCompletionTimeMs = totalCompletionTimeMs / completedTasksWithTime.length;
    
    // Convert to appropriate unit
    const averageHours = averageCompletionTimeMs / (1000 * 60 * 60);
    const averageDays = averageHours / 24;

    if (averageDays >= 1) {
      return {
        value: Math.round(averageDays * 10) / 10,
        unit: 'days',
        display: `${Math.round(averageDays * 10) / 10} days`
      };
    } else if (averageHours >= 1) {
      return {
        value: Math.round(averageHours * 10) / 10,
        unit: 'hours',
        display: `${Math.round(averageHours * 10) / 10} hours`
      };
    } else {
      const averageMinutes = averageCompletionTimeMs / (1000 * 60);
      return {
        value: Math.round(averageMinutes),
        unit: 'minutes',
        display: `${Math.round(averageMinutes)} min`
      };
    }
  };

  const avgCompletionTime = getAverageCompletionTime();

  // Weekly productivity data
  const getWeeklyProductivityData = () => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const today = new Date();
    const weekData = [];

    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      date.setHours(0, 0, 0, 0);
      
      const nextDay = new Date(date);
      nextDay.setDate(date.getDate() + 1);

      const createdTasks = todos.filter(todo => {
        const createdDate = new Date(todo.createdAt);
        return createdDate >= date && createdDate < nextDay;
      }).length;

      const completedTasks = todos.filter(todo => {
        if (!todo.completed || !todo.completedAt) return false;
        const completionDate = new Date(todo.completedAt);
        return completionDate >= date && completionDate < nextDay;
      }).length;

      weekData.push({
        day: days[date.getDay()],
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        created: createdTasks,
        completed: completedTasks,
        fullDate: date
      });
    }

    return weekData;
  };

  const weeklyData = getWeeklyProductivityData();

  return {
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
  }
}

export default useDashboard;