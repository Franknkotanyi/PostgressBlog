

// likeController.js
const { Likes } = require('../Database/models'); // Import the Likes and Posts models

export const likePost = async (req, res) => {
  try {
    const { postId } = req.params; // Get the post ID from the request parameters
    const userId = req.loggedInUser.id; // Get the user ID from the authenticated user

    // Check if the user has already liked the post
    const existingLike = await Likes.findOne({ where: { postId, userId } });

    if (existingLike) {
      // If the user has already liked the post, remove the like
      await existingLike.destroy();
      res.status(200).json({ message: 'Your like removed' });
    } else {
      // If the user hasn't liked the post, add a like
      await Likes.create({ postId, userId });
      res.status(200).json({ message: 'Post liked successfully' });
    }
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      console.error('Validation errors:', error.errors);
    } else {
      console.error('Unhandled error:', error);
    }
    return res.status(500).json({
      status: '500',
      message: 'Failed to add or remove like',
      error: error.message,
    });
  }
};


