type FileNode = {
  name: string;
  type: 'file' | 'directory';
  children?: FileNode[];
};

const fileTree: FileNode = {
  name: "turtlebot3_simulations",
  type: "directory",
  children: [
    {
      name: ".github",
      type: "directory",
      children: [
        {
          name: "workflows",
          type: "directory",
          children: [
            {
              name: "ci.yml",
              type: "file"
            }
          ]
        }
      ]
    },
    {
      name: "turtlebot3_fake_node",
      type: "directory",
      children: [
        {
          name: "launch",
          type: "directory",
          children: [
            {
              name: "turtlebot3_fake.launch.py",
              type: "file"
            }
          ]
        },
        {
          name: "src",
          type: "directory",
          children: [
            {
              name: "turtlebot3_fake_node.cpp",
              type: "file"
            }
          ]
        },
        {
          name: "CMakeLists.txt",
          type: "file"
        },
        {
          name: "package.xml",
          type: "file"
        }
      ]
    },
    {
      name: "turtlebot3_gazebo",
      type: "directory",
      children: [
        {
          name: "launch",
          type: "directory",
          children: [
            {
              name: "turtlebot3_empty_world.launch.py",
              type: "file"
            },
            {
              name: "turtlebot3_world.launch.py",
              type: "file"
            }
          ]
        },
        {
          name: "models",
          type: "directory",
          children: [
            {
              name: "turtlebot3",
              type: "directory",
              children: [
                {
                  name: "model.config",
                  type: "file"
                },
                {
                  name: "model.sdf",
                  type: "file"
                }
              ]
            }
          ]
        },
        {
          name: "worlds",
          type: "directory",
          children: [
            {
              name: "empty.world",
              type: "file"
            },
            {
              name: "turtlebot3_world.world",
              type: "file"
            }
          ]
        },
        {
          name: "CMakeLists.txt",
          type: "file"
        },
        {
          name: "package.xml",
          type: "file"
        }
      ]
    },
    {
      name: "CONTRIBUTING.md",
      type: "file"
    },
    {
      name: "LICENSE",
      type: "file"
    },
    {
      name: "README.md",
      type: "file"
    },
    {
      name: "turtlebot3_simulations_ci.repos",
      type: "file"
    }
  ]
};

export default fileTree;
