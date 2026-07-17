const techItems = [
  { label: 'HTML', icon: 'fab fa-html5' },
  { label: 'CSS', icon: 'fab fa-css3-alt' },
  { label: 'JavaScript', icon: 'fab fa-js' },
  { label: 'React', icon: 'fab fa-react' },
  { label: 'Flutter', icon: 'fab fa-flutter' },
  { label: 'Firebase', icon: 'fas fa-fire' },
  { label: 'Git', icon: 'fab fa-git-alt' },
  { label: 'GitHub', icon: 'fab fa-github' },
  { label: 'Figma', icon: 'fab fa-figma' },
  { label: 'Postman', icon: 'fas fa-flask' },
  { label: 'Dart', icon: 'fas fa-code' },
  { label: 'Python', icon: 'fab fa-python' },
]

export default function TechStack() {
  return (
    <section className="tech-stack">
      <div className="container">
        <div className="marquee-track">
          {[...techItems, ...techItems].map((item, i) => (
            <span key={i} className="marquee-item">
              <i className={item.icon}></i>
              {item.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
