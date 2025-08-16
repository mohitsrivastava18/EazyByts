import Activity from "../models/activitySchema.js";


export const getRecentActivities = async (req, res) => {
  try {
    const activities = await Activity.find({ userId: req.user._id })
      .sort({ timestamp: -1 }) // Newest first
      .limit(5); // Limit to 5 recent activities

    res.status(200).json(activities); // Frontend can format time if needed
  } catch (error) {
    console.error('Error fetching activities:', error);
    res.status(500).json({ message: 'Error fetching recent activities' });
  }
};