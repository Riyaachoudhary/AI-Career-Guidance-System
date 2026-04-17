import React, { useState, useEffect } from 'react';
import { FilePenLineIcon, PencilIcon, PlusIcon, TrashIcon, UploadCloud, XIcon } from 'lucide-react';
import { dummyResumeData } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {

  const colors = ["#9333ea", "#d97706", "#dc2626", "#0284c7", "#16a34a"];
  const [allResumes, setAllResumes] = useState([]);
  const [showCreateResume, setShowCreateResume] = useState(false);
  const [showUploadResume, setShowUploadResume] = useState(false);
  const [title, setTitle] = useState('');
  const [resume, setResume] = useState(null);
  const navigate = useNavigate();

  const loadAllResumes = async () => {
    setAllResumes(dummyResumeData);
  };

  const createResume = async (event) => {
    event.preventDefault();
    setShowCreateResume(false);
    navigate(`/app/builder/res123`);
  };

  const uploadResume = async (event) => {
    event.preventDefault();
    setShowUploadResume(false);
    navigate(`/app/builder/res123`);
  };

  useEffect(() => {
    loadAllResumes();
  }, []);

  return (
    <div className='max-w-7xl mx-auto px-4 py-8'>

      <p className='text-2xl font-medium mb-6 bg-gradient-to-r from-slate-600 to-slate-700 bg-clip-text text-transparent sm:hidden'>
        Welcome, Joe Doe
      </p>

      <div className='flex gap-4'>

        <button onClick={() => setShowCreateResume(true)} className='w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300 group hover:border-indigo-500 hover:shadow-lg transition-all duration-300 cursor-pointer'>
          <PlusIcon className='size-11 p-2.5 bg-gradient-to-br from-indigo-300 to-indigo-500 text-white rounded-full' />
          <p className='text-sm group-hover:text-indigo-600'>Create Resume</p>
        </button>

        <button onClick={() => setShowUploadResume(true)} className='w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300 group hover:border-purple-500 hover:shadow-lg transition-all duration-300 cursor-pointer'>
          <UploadCloud className='size-11 p-2.5 bg-gradient-to-br from-purple-300 to-purple-500 text-white rounded-full' />
          <p className='text-sm group-hover:text-purple-600'>Upload Existing</p>
        </button>

      </div>

      <hr className='border-slate-300 my-6 sm:w-[305px]' />

      <div className="grid grid-cols-2 sm:flex flex-wrap gap-4">
        {allResumes.map((resume, index) => {
          const baseColor = colors[index % colors.length];
          return (
            <button
              key={index}
              className='relative w-full sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 border group hover:shadow-lg transition-all duration-300 cursor-pointer'
              style={{ background: `linear-gradient(135deg, ${baseColor}10, ${baseColor}40)`, borderColor: baseColor + '40' }}>

              <FilePenLineIcon className='size-7 group-hover:scale-105' style={{ color: baseColor }} />
              <p className='text-sm px-2 text-center' style={{ color: baseColor }}>{resume.title}</p>

              <p className='absolute bottom-1 text-[11px] px-2 text-center' style={{ color: baseColor + '90' }}>
                Update on {new Date(resume.updatedAt).toLocaleDateString()}
              </p>

              <div className='absolute top-1 right-1 group-hover:flex items-center hidden'>
                <TrashIcon className='size-7 p-1.5 hover:bg-white/50 rounded' />
                <PencilIcon className='size-7 p-1.5 hover:bg-white/50 rounded' />
              </div>

            </button>
          );
        })}
      </div>

      {/* CREATE MODAL */}
      {showCreateResume && (
        <form onSubmit={createResume} onClick={() => setShowCreateResume(false)} className='fixed inset-0 bg-black/70 flex items-center justify-center'>
          <div onClick={e => e.stopPropagation()} className='bg-white rounded-lg w-full max-w-sm p-6'>
            <h2 className='text-xl font-bold mb-4'>Create Resume</h2>

            <input
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              type="text"
              placeholder='Enter resume title'
              className='w-full px-4 py-2 mb-4 border rounded'
              required
            />

            <button className='w-full py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors'>
              Create Resume
            </button>

            <XIcon className='absolute top-4 right-4 cursor-pointer' onClick={() => setShowCreateResume(false)} />
          </div>
        </form>
      )}

      {/* UPLOAD MODAL */}
      {showUploadResume && (
        <form onSubmit={uploadResume} onClick={() => setShowUploadResume(false)} className='fixed inset-0 bg-black/70 flex items-center justify-center'>
          <div onClick={e => e.stopPropagation()} className='bg-white rounded-lg w-full max-w-sm p-6'>
            <h2 className='text-xl font-bold mb-4'>Upload Resume</h2>

            <input
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              type="text"
              placeholder='Enter resume title'
              className='w-full px-4 py-2 mb-4 border rounded'
              required
            />

            <label htmlFor="resume-input" className='block text-sm'>
              <div className='flex flex-col items-center justify-center border border-dashed rounded-md p-6 cursor-pointer'>
                {resume ? <p>{resume.name}</p> : <p>Upload resume</p>}
              </div>
            </label>

            <input type="file" id='resume-input' accept='.pdf' hidden onChange={(e)=>setResume(e.target.files[0])} />

            <input
              type="file"
              id="resume-input"
              hidden
              onChange={(e) => setResume(e.target.files[0])}
            />

            <button className='w-full py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors mt-3'>
              Upload Resume
            </button>

            <XIcon className='absolute top-4 right-4 cursor-pointer' onClick={() => setShowUploadResume(false)} />
          </div>
        </form>
      )}

    </div>
  );
};

export default Dashboard;
