import { FaLinkedin, FaGithub } from 'react-icons/fa';

function About() {
	return (
		<div className="text-center p-2 flex flex-col items-start justify-between gap-10 mt-10">
      <div>
        <p className='font-bold text-2xl text-blue-800'>Chat with your friend via a custom room or explore rooms !</p>
      </div>
			<div className="italic flex flex-col items-start">
				<p>ChatApp lets you chat with the world</p>
				<p>Made by Jérémy TO</p>
			</div>
			<ul className="flex gap-4 list-none items-end text-xl">
				<li>
					<a href="https://www.linkedin.com/in/jérémy-to/">
						<FaLinkedin />
					</a>
				</li>
				<li>
					<a href="https://github.com/Jeremy-To">
						<FaGithub />
					</a>
				</li>
			</ul>
		</div>
	);
}

export default About;
