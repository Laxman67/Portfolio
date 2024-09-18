import { useSelector } from 'react-redux';

const UpdateProfile = () => {
  const { user, loading, error, isUpdated, message } = useSelector(
    (state) => state.user
  );

  const [fullName, setFullName] = useState(user && user.fullName);
  const [email, setEmail] = useState(user && user.email);
  const [phone, setPhone] = useState(user && user.phone);
  const [aboutMe, setAboutME] = useState(user && user.portfolioURL);
  const [portfolioURL, setPortfolioURL] = useState(
    user && (user.portfolioURL === 'undefined' ? '' : user.portfolioURL)
  );
  const [linkedInURL, setLinkedInURL] = useState(
    user && (user.portfolioURL === 'undefined' ? '' : user.portfolioURL)
  );

  const [githubURl, setGithubURl] = useState(
    user && (user.githubURL === 'undefined' ? '' : user.githubURL)
  );
  const [instagramURL, setInstagramURL] = useState(
    user && (user.instagramURL === 'undefined' ? '' : user.instagramURL)
  );
  const [twitterURL, setTwitterURL] = useState(
    user && (user.twitterURL === 'undefined' ? '' : user.twitterURL)
  );
  const [facebookURL, setFacebookURL] = useState(
    user && (user.facebookURL === 'undefined' ? '' : user.facebookURL)
  );
  const [avatar, setAvatar] = useState('');
  const [avatarPreview, setAvatarPreview] = useState('');
  const [resume, setResume] = useState('');
  const [resumePreview, setResumePreview] = useState('');

  return <></>;
};

export default UpdateProfile;
