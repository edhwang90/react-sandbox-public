import type { FiltersType, SelectOptionType, TodoType } from "../../types/types";

export const FiltersDefault: FiltersType = {
  status: "all",
  priority: "all",
  tags: [],
  search: ""
};

export const FiltersPriorities: SelectOptionType[] = [
  {
    value: 'all', label: 'All priorities'
  },
  {
    value: 'high', label: 'High priority'
  },
  {
    value: 'medium', label: 'Medium priority'
  },
  {
    value: 'low', label: 'Low priority'
  }
]

export const TodosJSON: TodoType[] = [
  {
    id: "1",
    title: "Plan weekend trip",
    description: "Decide on destination, book accommodation, and plan activities.",
    completed: false,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    priority: "medium",
    tags: ["travel", "planning"]
  },
  {
    id: "2", 
    title: "Buy groceries",
    description: "Milk, eggs, bread, fruits, vegetables, and snacks.",
    completed: true,
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
    completedAt: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
    priority: "low",
    tags: ["shopping", "food"]
  },
  {
    id: "3",
    title: "Set dentist appointment",
    description: "Call the clinic to schedule a routine check-up.",
    completed: false,
    createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
    priority: "low",
    tags: ["health", "personal"]
  },
  
  // Yesterday's tasks
  {
    id: "4",
    title: "Finish project presentation",
    description: "Complete slides and practice delivery for Monday's meeting.",
    completed: false,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    priority: "high",
    tags: ["work", "urgent"]
  },
  {
    id: "5",
    title: "Review code changes",
    description: "Go through the latest pull requests and provide feedback.",
    completed: true,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000 - 2 * 60 * 60 * 1000), // 1 day, 2 hours ago
    completedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    priority: "high",
    tags: ["work", "coding"]  
  },
  {
    id: "6",
    title: "Order birthday gift",
    description: "Find a nice gift and order it online to arrive on time.",
    completed: true,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000 - 4 * 60 * 60 * 1000), // 1 day, 4 hours ago
    completedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000), // 22 hours ago
    priority: "medium",
    tags: ["personal", "shopping"]
  },
  
  // 2 days ago
  {
    id: "7",
    title: "Schedule team meeting",
    description: "Coordinate with team members to find a suitable time.",
    completed: true,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    completedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 + 4 * 60 * 60 * 1000), // 2 days ago, 4 hours later
    priority: "high",
    tags: ["work", "management"]
  },
  {
    id: "8",
    title: "Update project documentation",
    description: "Add recent changes and ensure all sections are up to date.",
    completed: true,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 - 3 * 60 * 60 * 1000), // 2 days, 3 hours ago
    completedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 + 1 * 60 * 60 * 1000), // 2 days ago, 1 hour later
    priority: "medium",
    tags: ["work", "documentation"]
  },
  
  // 3 days ago
  {
    id: "9",
    title: "Book hotel for conference",
    description: "Find a hotel close to the venue and book a room.",
    completed: false,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    priority: "medium",
    tags: ["travel", "work"]
  },
  {
    id: "10",
    title: "Pay monthly bills",
    description: "Electricity, water, internet, and credit card bills.",
    completed: true,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000 - 1 * 60 * 60 * 1000), // 3 days, 1 hour ago
    completedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000), // 3 days ago, 2 hours later
    priority: "high",
    tags: ["finance", "personal"]
  },
  
  // 4 days ago
  {
    id: "11",
    title: "Prepare quarterly report",
    description: "Compile data and insights for the quarterly business review.",
    completed: true,
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4 days ago
    completedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000 + 6 * 60 * 60 * 1000), // 4 days ago, 6 hours later
    priority: "high",
    tags: ["work", "reports"]
  },
  {
    id: "12",
    title: "Clean apartment",
    description: "Vacuum, dust, mop floors, and clean bathrooms.",
    completed: true,
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000 - 2 * 60 * 60 * 1000), // 4 days, 2 hours ago
    completedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000 + 1 * 60 * 60 * 1000), // 4 days ago, 1 hour later
    priority: "low",
    tags: ["cleaning", "personal"]
  },
  
  // 5 days ago
  {
    id: "13",
    title: "Client presentation prep",
    description: "Finalize slides and rehearse for the upcoming client meeting.",
    completed: true,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    completedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000 + 8 * 60 * 60 * 1000), // 5 days ago, 8 hours later
    priority: "high",
    tags: ["work", "presentation"]
  },
  
  // 6 days ago
  {
    id: "14",
    title: "Gym workout",
    description: "Cardio and strength training session.",
    completed: true,
    createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000), // 6 days ago
    completedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000), // 6 days ago, 2 hours later
    priority: "low",
    tags: ["health", "exercise"]
  },
  {
    id: "15",
    title: "Plan team outing",
    description: "Decide on destination, book accommodation, and plan activities.",
    completed: false,
    createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000 - 3 * 60 * 60 * 1000), // 6 days, 3 hours ago
    priority: "medium",
    tags: ["work", "team"]
  },
]