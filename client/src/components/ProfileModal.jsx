import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../features/user/userSlice';
import React, { useState, useEffect } from 'react';
import { Pencil } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '@clerk/clerk-react';
import api from '../api/axios';

const ProfileModal = ({ setShowEdit }) => {
  const dispatch = useDispatch();
  const { getToken } = useAuth();

  const user = useSelector((state) => state.user.value);

  const [editForm, setEditForm] = useState({
    username: '',
    bio: '',
    location: '',
    profile_picture: null,
    cover_photo: null,
    full_name: '',
  });

  useEffect(() => {
    if (user) {
      setEditForm({
        username: user.username || '',
        bio: user.bio || '',
        location: user.location || '',
        full_name: user.full_name || '',
        profile_picture: null,
        cover_photo: null,
      });
    }
  }, [user]);

  const handleSaveProfile = async (e) => {
    e.preventDefault();

    try {
      const token = await getToken();

      const userData = new FormData();

      const {
        full_name,
        username,
        bio,
        location,
        profile_picture,
        cover_photo,
      } = editForm;

      userData.append('full_name', full_name);
      userData.append('username', username);
      userData.append('bio', bio);
      userData.append('location', location);

      if (profile_picture) {
        userData.append('profile', profile_picture);
      }

      if (cover_photo) {
        userData.append('cover', cover_photo);
      }

      const { data } = await api.post('/api/user/update', userData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data.success) {
        dispatch(updateUser(data.user));
        toast.success('Profile Updated');
        setShowEdit(false);
      }
    } catch (error) {
      console.log(error);
      toast.error('Update Failed');
    }
  };

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 z-50 h-screen overflow-y-scroll bg-black/50">
      <div className="max-w-2xl sm:py-6 mx-auto">
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            Edit Profile
          </h1>

          <form
            className="space-y-4"
            onSubmit={(e) =>
              toast.promise(handleSaveProfile(e), { loading: 'Saving...' })
            }
          >
            {/* Profile Picture */}

            <div className="flex flex-col items-start gap-3">
              <label htmlFor="profile_picture">
                <input
                  hidden
                  type="file"
                  accept="image/*"
                  id="profile_picture"
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      profile_picture: e.target.files[0],
                    })
                  }
                />

                <div className="relative group cursor-pointer">
                  <img
                    src={
                      editForm.profile_picture
                        ? URL.createObjectURL(editForm.profile_picture)
                        : user?.profile_picture ||
                          'https://via.placeholder.com/100'
                    }
                    alt=""
                    className="w-24 h-24 rounded-full object-cover"
                  />

                  <div className="absolute hidden group-hover:flex top-0 left-0 right-0 bottom-0 bg-black/30 rounded-full items-center justify-center">
                    <Pencil className="w-5 h-5 text-white" />
                  </div>
                </div>
              </label>
            </div>

            {/* Cover Photo */}

            <div className="flex flex-col items-start gap-3">
              <label htmlFor="cover_photo">
                <input
                  hidden
                  type="file"
                  accept="image/*"
                  id="cover_photo"
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      cover_photo: e.target.files[0],
                    })
                  }
                />

                <div className="relative group cursor-pointer">
                  <img
                    src={
                      editForm.cover_photo
                        ? URL.createObjectURL(editForm.cover_photo)
                        : user?.cover_photo ||
                          'https://via.placeholder.com/600x200'
                    }
                    alt=""
                    className="w-80 h-40 rounded-lg object-cover"
                  />

                  <div className="absolute hidden group-hover:flex top-0 left-0 right-0 bottom-0 bg-black/30 rounded-lg items-center justify-center">
                    <Pencil className="w-5 h-5 text-white" />
                  </div>
                </div>
              </label>
            </div>

            {/* Name */}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>

              <input
                type="text"
                className="w-full p-3 border border-gray-200 rounded-lg"
                placeholder="Enter full name"
                value={editForm.full_name}
                onChange={(e) =>
                  setEditForm({ ...editForm, full_name: e.target.value })
                }
              />
            </div>

            {/* Username */}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>

              <input
                type="text"
                className="w-full p-3 border border-gray-200 rounded-lg"
                placeholder="Enter username"
                value={editForm.username}
                onChange={(e) =>
                  setEditForm({ ...editForm, username: e.target.value })
                }
              />
            </div>

            {/* Bio */}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bio
              </label>

              <textarea
                rows={3}
                className="w-full p-3 border border-gray-200 rounded-lg"
                placeholder="Enter bio"
                value={editForm.bio}
                onChange={(e) =>
                  setEditForm({ ...editForm, bio: e.target.value })
                }
              />
            </div>

            {/* Location */}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>

              <input
                type="text"
                className="w-full p-3 border border-gray-200 rounded-lg"
                placeholder="Enter location"
                value={editForm.location}
                onChange={(e) =>
                  setEditForm({ ...editForm, location: e.target.value })
                }
              />
            </div>

            {/* Buttons */}

            <div className="flex justify-end space-x-3 pt-6">
              <button
                onClick={() => setShowEdit(false)}
                type="button"
                className="px-4 py-2 border border-gray-300 rounded-lg"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
