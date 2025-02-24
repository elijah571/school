import { LatestNews } from "../../components/news/LatestNews";
import "./News.css";

export const News = () => {
  return (
    <div className="news-container">
      <div className="banner"></div>

      <div>
        <h1>ATUNRASHE Sport Day: Record Broken and Champions Crowned!</h1>

        <p>
          <strong>Atunrashe High School recently hosted its 🏆 Annual Sports Day</strong>, an event filled with energy, excitement, and healthy competition. The day brought together students, teachers, and parents to celebrate athletic excellence and teamwork in an atmosphere of sportsmanship and school pride.
        </p>

        <h3>🏅 Opening Ceremony</h3>
        <p>The event kicked off with an inspiring speech from the principal, highlighting the importance of sports in developing discipline, teamwork, and resilience. The school’s marching band led a colorful parade, with each house proudly displaying their banners and colors.</p>

        <h3>🏆 Exciting Competitions</h3>
        <ul>
          <li>Track and Field Races (100m, 200m, 400m, relay races)</li>
          <li>Football and Basketball Matches</li>
          <li>High Jump and Long Jump Competitions</li>
          <li>Table Tennis and Chess Tournaments</li>
          <li>Fun Games (Tug of War, Sack Race, Egg and Spoon Race)</li>
        </ul>

        <h3>🎽 House Spirit and Teamwork</h3>
        <p>The school’s four houses – <strong>Red, Blue, Green, and Yellow</strong> – cheered passionately for their teams. The House Captains motivated their teammates, and the crowd erupted in cheers as records were broken and champions emerged.</p>

        <h3>⚽ Teachers vs. Students Match</h3>
        <p>A highlight of the day was the <strong>Teachers vs. Students football match</strong>, where teachers and students went head-to-head in a thrilling and entertaining game. Laughter, cheers, and unexpected skills made this one of the most memorable moments of the event.</p>

        <h3>🏅 Awards and Recognition</h3>
        <p>At the end of the day, medals and trophies were awarded to outstanding athletes and the overall <strong>winning house</strong>. Special recognition was given to the <strong>Best Male and Female Athletes</strong>, and the school principal praised the students for their sportsmanship and determination.</p>

        <h3>🎉 Closing Ceremony</h3>
        <p>The event concluded with a closing speech, thanking the organizers, coaches, and supporters. The principal encouraged students to continue engaging in sports as a way to stay <strong>healthy, disciplined, and competitive</strong>.</p>

        <p className="footer">
          🎊 <strong>The Atunrashe High School Sports Day 2025 was a resounding success</strong>, leaving behind memories of teamwork, perseverance, and fun. We look forward to an even bigger and better event next year! 🚀
        </p>
      </div>
      <LatestNews/>
    </div>
  );
};
